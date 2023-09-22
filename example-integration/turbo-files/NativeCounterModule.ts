import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  set(counter: number): void;
}

export default TurboModuleRegistry.get<Spec>('RTNCounterModule');
