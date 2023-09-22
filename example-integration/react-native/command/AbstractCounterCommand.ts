import {LoadingState} from '../misc/loadingHandler';
import {setCounter} from '../redux/ApplicationState';
import {AbstractStatefulCommand} from './common/AbstractStatefulCommand';
import CounterModule from '../../turbo-files/NativeCounterModule';

export abstract class AbstractCounterCommand extends AbstractStatefulCommand<number> {
  LOADING_STATE: LoadingState = 'UNKNOWN';
  async persistToStore(data: number): Promise<void> {
    this.dispatch(setCounter(data));
  }
  async persistToNative(data: number): Promise<void> {
    if (!CounterModule?.set) {
      console.warn('Turbo Native Module could not be called!');
      return;
    }
    CounterModule.set(data);
  }
  async executeStateful(): Promise<number | undefined> {
    const prevCounter = this.state?.ApplicationState.counter;
    if (!prevCounter) {
      return;
    }
    const newCounter = await this.modifyCounter(prevCounter);
    console.debug(`changing counter from ${prevCounter} to ${newCounter}.`);
    return newCounter;
  }

  abstract modifyCounter(counter: number): Promise<number | undefined>;
}
