/*
 * Copyright CURSOR Software AG
 */

import React, {PropsWithChildren} from 'react';
import {ActivityIndicator, useWindowDimensions, Text} from 'react-native';
import {LoadingState} from '../misc/loadingHandler';

const ACTIVITY_INDICATOR_SIZE = 48;
const ACTIVITY_INDICATOR_SIZE_RADIUS = ACTIVITY_INDICATOR_SIZE / 2;

export function LoadingIndicator({
  children,
  loadingState,
}: PropsWithChildren<{
  loadingState: string | Set<LoadingState> | boolean | undefined;
}>) {
  const {height, width} = useWindowDimensions();

  const isLoading =
    typeof loadingState === 'boolean'
      ? loadingState
      : loadingState !== undefined;

  return (
    <>
      {__DEV__ && isLoading && (
        <>
          <Text
            style={{
              position: 'absolute',
              top: height / 2 - ACTIVITY_INDICATOR_SIZE_RADIUS + 14,
              left: width / 2 - ACTIVITY_INDICATOR_SIZE_RADIUS - 24,
              zIndex: 100,
            }}>
            REACT NATIVE
          </Text>
          {loadingState && typeof loadingState !== 'boolean' && (
            <Text
              style={{
                position: 'absolute',
                top: height / 2 - ACTIVITY_INDICATOR_SIZE_RADIUS + 30,
                left: width / 2 - ACTIVITY_INDICATOR_SIZE_RADIUS - 24,
                zIndex: 100,
              }}>
              (
              {typeof loadingState === 'string'
                ? loadingState
                : Array.from(loadingState as Set<LoadingState>).join('\n')}
              )
            </Text>
          )}
        </>
      )}
      <ActivityIndicator
        size={ACTIVITY_INDICATOR_SIZE}
        animating={isLoading}
        style={{
          position: 'absolute',
          top: height / 2 - ACTIVITY_INDICATOR_SIZE_RADIUS,
          left: width / 2 - ACTIVITY_INDICATOR_SIZE_RADIUS,
          zIndex: 99,
        }}
      />
      {children}
    </>
  );
}
