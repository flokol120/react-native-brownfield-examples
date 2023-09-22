import {AbstractCounterCommand} from './AbstractCounterCommand';

export class DecrementCommand extends AbstractCounterCommand {
  constructor() {
    super();
  }

  async modifyCounter(counter: number): Promise<number | undefined> {
    return counter - 1;
  }
}
