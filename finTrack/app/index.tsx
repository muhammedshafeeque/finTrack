import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import DashboardScreen from './dashboard';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <DashboardScreen />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
