import {NativeModules} from 'react-native';

const {LoggingModule} = NativeModules;

interface LoggingInterface {
  log: (title: string, body: string) => Promise<string>;
}

export default LoggingModule as LoggingInterface;
