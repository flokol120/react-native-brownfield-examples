import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {reducer as network} from 'react-native-offline';
import ApplicationState, {
  INITIAL_STATE as applicationStateInitState,
} from './ApplicationState';
const combinedReducer = combineReducers({
  ApplicationState,
  network,
});

export type State = ReturnType<typeof combinedReducer>;

const appReducer = (state: State, action: any) => {
  if (action.type === 'CLEAR') {
    return {
      ApplicationState: applicationStateInitState,
    } as State;
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, appReducer);

const middleware: any[] = [];

if (__DEV__) {
  middleware.push(require('redux-logger').default);
}

export const store = configureStore({
  middleware,
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
