import {InteractionManager} from 'react-native';

export const runAfterInteractions = async (task: () => Promise<any>) =>
  new Promise<any>((resolve, reject) =>
    InteractionManager.runAfterInteractions({
      name: Math.random().toString(),
      gen: async () => {
        try {
          resolve(await task());
        } catch (e) {
          reject(e);
        }
      },
    }),
  );

export const requestAnimationFramePromise = async (task: () => Promise<any>) =>
  new Promise<any>((resolve, reject) =>
    requestAnimationFrame(async () => {
      try {
        resolve(await task());
      } catch (e) {
        reject(e);
      }
    }),
  );
