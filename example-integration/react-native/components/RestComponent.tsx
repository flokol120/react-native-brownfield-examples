import {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {BridgeServer} from 'react-native-http-bridge-refurbished';
import {withDefaultProvider} from '../misc/HOCs';
import {store} from '../redux';
import {decrementCounter, incrementCounter} from '../redux/ApplicationState';

export function RestComponent() {
  useEffect(() => {
    const server = new BridgeServer('http_service', true);
    server.get('/ping', async (req, res) => {
      console.log('got ping request');
      res.send(200, 'text/plain', 'pong');
    });
    server.get('/counter', async (req, res) => {
      const counter = store.getState().ApplicationState.counter;
      console.log('/ requested');
      return {counter};
    });
    server.get('/increment', async (req, res) => {
      store.dispatch(incrementCounter());
      res.send(200, 'text/plain', 'OK');
    });
    server.get('/decrement', async (req, res) => {
      store.dispatch(decrementCounter());
      res.send(200, 'text/plain', 'OK');
    });
    console.log('should start server');
    server.listen(3000);

    return () => server.stop();
  }, []);

  // is displaying nothing!
  return null;
}

AppRegistry.registerComponent('REST', () => withDefaultProvider(RestComponent));
