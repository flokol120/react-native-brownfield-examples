import {useCallback, useEffect} from 'react';
import {Text, View, Button, AppRegistry, StyleSheet} from 'react-native';
import {withDefaultProvider} from '../misc/HOCs';
import {
  appendLargeData,
  applyNestedChange,
  decrementCounter,
  incrementCounter,
  removeLargeData,
  setCounter,
  useCount,
} from '../redux/ApplicationState';
import {useDispatch} from 'react-redux';
import {store} from '../redux';

// Profiling data, inserting, removing and updating large data sets

const SIZE = 1; // 1 2 4 8 16 32

const addDataSets = () => {
  store.dispatch(removeLargeData());
  for (let i = 0; i < SIZE; i++) {
    store.dispatch(appendLargeData());
  }
};

setTimeout(() => {
  addDataSets();
  let counter = 0;
  const applyChanges = () => {
    if (counter === 30) {
      counter = 0;
      console.log('REMOVING large data sets');
      addDataSets();
      return;
    }
    console.log('MODIFYING large data set');
    store.dispatch(applyNestedChange());
    counter++;
  };
  setInterval(applyChanges, 1000);
}, 5000);

type CounterProps = {initialCount?: number};

export function Counter({initialCount}: CounterProps) {
  const dispatch = useDispatch();
  const count = useCount();

  const increment = useCallback(() => dispatch(incrementCounter()), [dispatch]);

  const decrement = useCallback(() => dispatch(decrementCounter()), [dispatch]);

  useEffect(() => {
    if (!initialCount) return;
    dispatch(setCounter(initialCount));
  }, [initialCount, dispatch]);

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

AppRegistry.registerComponent('Counter', () => withDefaultProvider(Counter));
