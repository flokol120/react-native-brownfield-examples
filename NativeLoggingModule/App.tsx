/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  NativeEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoggingModule from './modules/LoggingModule';
import EventEmitterModule from './modules/EventEmitterModule';
import TurboLoggingModule from './turbo-files/NativeLogging';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(EventEmitterModule);
    // silence event emitter to avoid console spam
    const listener = [eventEmitter.addListener('logToReactNative', () => {})];
    return () => listener.forEach(currListener => currListener.remove());
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            onPress={async () => {
              const response = await LoggingModule.log(
                'Hello!',
                'Hello from React Native!',
              );
              console.log(response);
            }}
            title="log message"
          />
          <Button
            onPress={async () => {
              try {
                const response = await LoggingModule.log('', 'No title');
                console.log(response);
              } catch (e) {
                console.warn(e);
              }
            }}
            title="log erroneous message"
          />
          <Button
            onPress={async () => {
              const response = await TurboLoggingModule?.log(
                'Hello!',
                'Hello from React Native using Turbo Modules!',
              );
              console.log(response);
            }}
            title="log message (turbo)"
          />
          <Button
            onPress={async () => {
              try {
                const response = await TurboLoggingModule?.log('', 'No title');
                console.log(response);
              } catch (e) {
                console.warn(e);
              }
            }}
            title="log erroneous message (turbo)"
          />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
