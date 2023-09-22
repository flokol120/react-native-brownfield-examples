import {PromisifiedCommand} from './CommandController';

export abstract class AbstractStatefulCommand<DataType>
  extends PromisifiedCommand
  implements StatefulCommand<DataType>
{
  abstract persistToStore(data: DataType): Promise<void>;
  abstract persistToNative(data: DataType): Promise<void>;

  abstract executeStateful(): Promise<DataType | undefined>;

  async executeAsync(): Promise<any> {
    const data = await this.executeStateful();
    if (!data) {
      return;
    }
    this.persistToStore(data);
    this.persistToNative(data);
  }
}
