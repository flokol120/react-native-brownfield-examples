import {PromisifiedCommand} from './CommandController';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class AbstractApiCommand<
  ResponseType,
> extends PromisifiedCommand {
  constructor(
    private requestMethod: RequestMethod,
    private endpoint: string,
    private body?: any,
  ) {
    super();
  }

  private static BASE_URL?: string;
  private static CREDENTIALS?: RequestCredentials;

  public static set baseURL(url: string) {
    AbstractApiCommand.BASE_URL = url;
  }

  public static get baseURL(): string | undefined {
    return AbstractApiCommand.BASE_URL;
  }

  public static set credentials(credentials: RequestCredentials) {
    this.CREDENTIALS = credentials;
  }

  public get completeEndpoint() {
    return `${AbstractApiCommand.BASE_URL}/${this.endpoint}`;
  }

  async executeApiRequest(): Promise<ResponseType | undefined> {
    if (!AbstractApiCommand.BASE_URL) {
      throw new Error('no BASE_URL set.');
    }
    let response: Response = await fetch(this.completeEndpoint, {
      body: this.body,
      method: this.requestMethod,
      credentials: AbstractApiCommand.CREDENTIALS,
    });
    if (!response || !response.ok) {
      return;
    }
    const jsonResult = await response.json();
    if (!jsonResult) {
      return;
    }
    return jsonResult as ResponseType;
  }

  async executeAsync(): Promise<ResponseType | undefined> {
    return this.executeApiRequest();
  }
}
