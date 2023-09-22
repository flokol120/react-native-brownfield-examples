import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native';
import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../redux';
import {
  CommandController,
  CommandControllerContext,
} from '../command/common/CommandController';
import {useIsLoading} from './loadingHandler';
import {LoadingIndicator} from '../components/LoadingIndicator';

export const withReduxComponent =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );

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
export const withCommandContext =
  <T extends {baseURL: string}>(
    Component: React.ComponentType<any>,
  ): React.FC<T> =>
  (props: any) => {
    const commandController = useMemo(() => new CommandController(), []);
    return (
      <CommandControllerContext.Provider value={commandController}>
        <Component {...props} />
      </CommandControllerContext.Provider>
    );
  };

export const withActivityIndicator =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => {
    const loadingState = useIsLoading();

    return (
      <LoadingIndicator loadingState={loadingState}>
        <Component {...props} />
      </LoadingIndicator>
    );
  };

export const withDefaultProvider =
  (Component: React.ComponentType<any>): React.FC<any> =>
  (props: any) => {
    return withReduxComponent(
      withNetworkProviderComponent(
        withSafeAreaComponent(
          withCommandContext(withActivityIndicator(Component)),
        ),
      ),
    )(props);
  };
