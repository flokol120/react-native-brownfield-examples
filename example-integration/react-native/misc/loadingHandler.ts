import {useState} from 'react';

export type LoadingState = 'SEARCH' | 'COMMAND_CHAIN' | 'UNKNOWN' | 'NONE';

type LoadingHandler = {
  id: number;
  state: LoadingState;
};

let ID_COUNTER = 0;

export let setIsLoading: (loadingState: LoadingState) => () => void =
  () => () =>
    undefined;
export let clearLoadingState: () => void = () => undefined;
export const useIsLoading = () => {
  const [loadingHandler, setLoadingHandler] = useState<LoadingHandler[]>([]);
  const newId = ++ID_COUNTER;
  setIsLoading = (loadingState: LoadingState) => {
    setLoadingHandler(old => [
      ...old,
      {
        id: newId,
        state: loadingState,
      },
    ]);
    return () =>
      setLoadingHandler(old => [...old.filter(({id}) => id !== newId)]);
  };
  clearLoadingState = () => setLoadingHandler([]);
  return loadingHandler.length > 0
    ? new Set(loadingHandler.map(({state}) => state))
    : undefined;
};
