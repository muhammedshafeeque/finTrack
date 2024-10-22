import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { api } from '@/services/api';

export default function ReportsScreen() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Reports' }} />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Income vs Expenses</ThemedText>
          {/* Add a chart component here */}
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Spending by Category</ThemedText>
          {/* Add a pie chart component here */}
        </ThemedView>
        {/* Add more report sections as needed */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
