import React, {useEffect} from 'react';
import {NativeEventEmitter, SafeAreaView} from 'react-native';
import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../redux';
import NativeReduxMirror from '../../turbo-files/NativeReduxMirror';
import {ApplicationStateActions} from '../redux/ApplicationState';

export const withReduxComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => {
    useEffect(() => {
      store.subscribe(() => {
        const state = store.getState();
        NativeReduxMirror?.update(state);
      });
      const reduxMirrorEventEmitter = new NativeEventEmitter(NativeReduxMirror);
      if (reduxMirrorEventEmitter.listenerCount('triggerAction') > 0) {
        return;
      }
      const listener = [
        reduxMirrorEventEmitter.addListener(
          'triggerAction',
          ({payload, action}: {payload?: any; action: string}) => {
            const actionFunction = (ApplicationStateActions as any)[action];
            console.log('triggering action', action);
            if (!actionFunction) {
              console.error(`No action called ${action} found!`);
              return;
            }
            store.dispatch(actionFunction(payload));
          },
        ),
      ];
      return () => listener.forEach(({remove}) => remove());
    }, []);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    );
  };

export const withNetworkProviderComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => (
    <NetworkProvider>
      <Component {...props} />
    </NetworkProvider>
  );

export const withSafeAreaComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => (
    <SafeAreaView>
      <Component {...props} />
    </SafeAreaView>
  );

export const withDefaultProvider =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => {
    return withReduxComponent(
      withNetworkProviderComponent(withSafeAreaComponent(Component)),
    )(props);
  };
