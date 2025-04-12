import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import DeviceControl from "./components/DeviceControl";

export default function App() {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('screen');
    return {
      screenWidth: width,
      screenHeight: height,
      isLandscape: width > height
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      const { width, height } = screen;
      setDimensions({
        screenWidth: width,
        screenHeight: height,
        isLandscape: width > height
      });
    });

    return () => subscription?.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="#10b981" />
        <DeviceControl isLandscape={dimensions.isLandscape} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9f5",
  },
});