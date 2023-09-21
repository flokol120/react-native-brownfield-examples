import {StyleProp, requireNativeComponent} from 'react-native';

export const ProgressBar = requireNativeComponent<{
  progress?: number;
  onPress?: () => void;
  style?: StyleProp<any>;
}>('RTNProgressBar');
