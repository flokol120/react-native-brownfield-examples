import {NativeModule, NativeModules} from 'react-native';

const {EventEmitterModule} = NativeModules;

interface EventEmitterInterface extends NativeModule {}

export default EventEmitterModule as EventEmitterInterface;
