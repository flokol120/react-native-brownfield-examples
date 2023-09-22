import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {createContext, useContext} from 'react';
import {Dispatch} from 'redux';
import {
  requestAnimationFramePromise,
  runAfterInteractions,
} from '../../misc/utils';
import {LoadingState, setIsLoading} from '../../misc/loadingHandler';
import {State, store} from '../../redux';
import {ApplicationState} from '../../redux/ApplicationState';

export const useCommandController = () => {
  const commandController = useContext<CommandController | undefined>(
    CommandControllerContext,
  );
  if (!commandController) {
    throw new Error('no command controller initialized!');
  }
  return commandController;
};

enum CommandState {
  QUEUED = 'QUEUED',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export type ExecutionMode = 'AFTER_INTERACTIONS' | 'ANIMATION_FRAME' | 'NONE';

export abstract class Command {
  public commandController?: CommandController;
  private _executionState = CommandState.QUEUED;

  abstract LOADING_STATE: LoadingState;

  /**
   * Set this to ANIMATION_FRAME if the extending command ist doing something like transitions, animations, ...
   * Leave it to AFTER_INTERACTIONS if the Command is doing harder work, e.g. API-Calls, State Transformation, ...
   * Set to NONE if none of the above apply
   * @protected
   */
  protected executionMode: ExecutionMode = 'AFTER_INTERACTIONS';

  protected constructor() {}

  public get state() {
    return this.commandController?.state;
  }

  public get dispatch() {
    return this.commandController!.dispatch;
  }

  public get executionState() {
    return this._executionState;
  }

  public addCommands(...commands: Command[]) {
    this.commandController?.addCommands(...commands);
  }

  public async isConnected() {
    return (
      this.commandController?.isConnected ??
      (await NetInfo.fetch()).isInternetReachable ??
      true
    );
  }

  abstract doExecute(
    proceed: (result?: any) => void,
    cancel: (reason?: any) => void,
  ): void;

  protected executeCommandPromise() {
    const promise = () =>
      new Promise<any>((resolve, reject) => this.doExecute(resolve, reject));
    switch (this.executionMode) {
      case 'ANIMATION_FRAME':
        return requestAnimationFramePromise(promise);
      case 'AFTER_INTERACTIONS':
        return runAfterInteractions(promise);
      default:
        return promise();
    }
  }

  public async execute(): Promise<any> {
    this._executionState = CommandState.PROCESSING;
    console.debug(`${this.name} >> ${this._executionState}`);
    try {
      const result = await this.executeCommandPromise();
      this._executionState = CommandState.DONE;
      console.debug(`${this.name} >> DONE`);
      return result;
    } catch (e) {
      console.debug(`${this.name} --> cancelled with exception: ${e}`);
      this._executionState = CommandState.CANCELLED;
      // re-throw to reject Promise
      throw e;
    }
  }

  public get name() {
    return this.constructor.name;
  }
}

export abstract class PromisifiedCommand extends Command {
  doExecute(
    proceed: (result?: any) => void,
    cancel: (reason?: any) => void,
  ): void {
    this.executeAsync()
      .then(result => proceed(result))
      .catch(reason => cancel(reason));
  }

  abstract executeAsync(): Promise<any>;
}

let ID_COUNTER = 0;

class CommandChain {
  private _id = ++ID_COUNTER;

  constructor(
    private _commands: Command[],
    private _ignoreErrors = false,
  ) {}

  public get id() {
    return this._id;
  }

  public get commands() {
    return this._commands;
  }

  public get nextCommand() {
    return this._commands.find(
      command => command.executionState === CommandState.QUEUED,
    );
  }

  public get ignoreErrors() {
    return this._ignoreErrors;
  }

  public insertNextCommands(...commands: Command[]) {
    const nextCommand = this.nextCommand;
    if (!nextCommand) {
      this._commands = commands;
      return;
    }
    const index = commands.indexOf(nextCommand);
    this._commands = [
      ...this._commands.slice(0, index),
      ...commands,
      ...this._commands.slice(index),
    ];
  }
}

export class CommandController {
  dispatch: Dispatch<any> = store.dispatch;
  private _networkState?: NetInfoState;

  private chains: CommandChain[] = [];
  private isRunning = false;

  constructor() {
    NetInfo.addEventListener(
      networkState => (this._networkState = networkState),
    );
    NetInfo.fetch().then(networkState => (this._networkState = networkState));
  }

  public get state(): State {
    return store.getState();
  }

  public get applicationState(): ApplicationState {
    return this.state.ApplicationState;
  }

  public get networkState() {
    return this._networkState;
  }

  public get isConnected() {
    return this.networkState?.isInternetReachable ?? true;
  }

  public addCommands(...commands: Command[]) {
    this.createCommandChain(false, ...commands);
  }

  public addIndependentCommands(...commands: Command[]) {
    this.createCommandChain(true, ...commands);
  }

  private createCommandChain(ignoreErrors: boolean, ...commands: Command[]) {
    const commandChain = new CommandChain(commands, ignoreErrors);
    this.chains = [...this.chains, commandChain];
    const _ = this.doCommandHandling();
    return this.getDisposeCallback(commandChain);
  }

  public addSubCommands(...commands: Command[]) {
    const commandChain = new CommandChain(commands);
    this.chains = [commandChain, ...this.chains];
    const _ = this.doCommandHandling();
    return this.getDisposeCallback(commandChain);
  }

  private getDisposeCallback(commandChain: CommandChain) {
    return () => {
      this.chains = [
        ...this.chains.filter(chain => chain.id !== commandChain.id),
      ];
      console.debug(
        `${commandChain.commands
          .map(command => command.name)
          .join(',')} >> DISPOSED`,
      );
      console.debug('XX-----------XX----------XX');
    };
  }

  private async doCommandHandling() {
    if (this.isRunning) {
      return;
    }
    const dispose = setIsLoading('COMMAND_CHAIN');
    this.isRunning = true;
    let currentChain: CommandChain | undefined = this.chains[0];
    let currentCommand = currentChain.nextCommand;
    console.debug('------ CommandChains ------');
    console.debug(
      this.chains
        .map((chain, index) => [
          `[${index}]: `,
          chain.commands.map(entry => entry.name),
        ])
        .join(','),
    );
    while (currentCommand) {
      const dispose =
        currentCommand.LOADING_STATE !== 'NONE'
          ? setIsLoading(currentCommand.LOADING_STATE)
          : undefined;
      currentCommand.commandController = this;
      try {
        await currentCommand?.execute();
      } catch (e) {
        console.debug(e);
        if (!currentChain!.ignoreErrors) {
          currentChain = this.processNextChain();
          throw e;
        }
      }
      if (
        !currentChain?.nextCommand ||
        this.chains.every(chain => currentChain?.id !== chain.id)
      ) {
        currentChain = this.processNextChain();
      }
      currentCommand = currentChain?.nextCommand;
      dispose && dispose();
    }
    // await this.executeconsole.debug(this.currentChain?.nextCommand);
    this.isRunning = false;
    console.debug('finished running CommandChains');
    console.debug('---------------------------');
    dispose();
  }

  private get currentChain() {
    if (this.chains.length === 0) {
      return;
    }
    return this.chains[0];
  }

  private processNextChain() {
    if (this.chains.shift()) {
      return this.chains[0];
    }
    return;
  }

  public cancelAllCommands() {
    this.chains = [];
  }
}

export const CommandControllerContext = createContext<
  CommandController | undefined
>(undefined);
