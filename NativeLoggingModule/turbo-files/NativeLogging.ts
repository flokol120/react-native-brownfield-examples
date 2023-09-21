import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  log(title: string, body: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('RTNLogging');
