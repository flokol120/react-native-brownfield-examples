import {AbstractApiCommand} from './AbstractApiCommand';

export abstract class AbstractStatefulApiCommand<ResponseType>
  extends AbstractApiCommand<ResponseType>
  implements StatefulCommand<ResponseType>
{
  abstract persistToStore(data: ResponseType): Promise<void>;
  abstract persistToNative(data: ResponseType): Promise<void>;
  abstract getFromStore(): Promise<ResponseType | undefined>;
  abstract getFromNative(): Promise<ResponseType | undefined>;

  private async persistToStores(data: ResponseType) {
    this.persistToStore(data);
    this.persistToNative(data);
  }

  async executeAsync(): Promise<ResponseType | undefined> {
    let response: ResponseType | undefined;
    if (await this.isConnected()) {
      response = await this.executeApiRequest();
    } else {
      response = await this.getFromStore();
      if (!response) {
        response = await this.getFromNative();
      }
    }
    if (!response) {
      throw new OfflineNoResponseError();
    }
    this.persistToStores(response);
    return response;
  }
}

class OfflineNoResponseError extends Error {
  constructor() {
    super('Data could not be fetched in offline scenario.');
  }
}
