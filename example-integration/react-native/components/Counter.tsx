import {useCallback, useState} from 'react';
import {AppRegistry, Button, StyleSheet, Text, View} from 'react-native';

type CounterProps = {initialCount?: number};

export function Counter({initialCount}: CounterProps) {
  const [count, setCount] = useState(initialCount ?? 0);

  const increment = useCallback(
    () => setCount(oldCount => oldCount + 1),
    [setCount],
  );

  const decrement = useCallback(
    () => setCount(oldCount => oldCount - 1),
    [setCount],
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.reactNativeIndicator}>
          <Text style={{fontSize: 32, color: 'rgba(64, 64, 64, .4)'}}>
            React Native
          </Text>
        </View>
        <Text style={{fontSize: 32}}>The current count is: {count}</Text>
        <View style={styles.buttonView}>
          <Button title="increment (+1)" onPress={increment} />
          <Button title="decrement (-1)" onPress={decrement} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 12,
  },
  container: {
    backgroundColor: 'rgb(200, 200, 200)',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 24,
  },
  reactNativeIndicator: {
    position: 'absolute',
    transform: [{rotate: '45deg'}],
    top: 52,
    zIndex: -99,
  },
});

AppRegistry.registerComponent('Counter', () => Counter);
