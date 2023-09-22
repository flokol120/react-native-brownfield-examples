import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    update(data: Object): void;
    addListener: (eventType: string) => void;
    removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RTNReduxMirror');