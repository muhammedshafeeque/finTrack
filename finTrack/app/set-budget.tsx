import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { api } from '@/services/api';

export default function SetBudgetScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');

  const handleSetBudget = async () => {
    try {
      await api.setBudget(parseFloat(amount));
      router.back();
    } catch (error) {
      console.error('Error setting budget:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Set Budget' }} />
      <ThemedView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Budget Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.button} onPress={handleSetBudget}>
          <ThemedText style={styles.buttonText}>Set Budget</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
