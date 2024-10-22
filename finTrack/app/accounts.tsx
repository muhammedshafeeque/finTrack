import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { api } from '@/services/api';

type Account = {
  id: string;
  name: string;
  balance: number;
};

export default function AccountsScreen() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await api.getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const addAccount = async () => {
    if (newAccountName.trim()) {
      try {
        await api.addAccount(newAccountName);
        setNewAccountName('');
        fetchAccounts();
      } catch (error) {
        console.error('Error adding account:', error);
      }
    }
  };

  const renderAccount = ({ item }: { item: Account }) => (
    <View style={styles.accountItem}>
      <ThemedText style={styles.accountName}>{item.name}</ThemedText>
      <ThemedText style={styles.accountBalance}>₹{item.balance.toFixed(2)}</ThemedText>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Accounts' }} />
      <ThemedView style={styles.container}>
        <View style={styles.addAccountContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Account Name"
            value={newAccountName}
            onChangeText={setNewAccountName}
          />
          <TouchableOpacity style={styles.addButton} onPress={addAccount}>
            <Ionicons name="add" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={accounts}
          renderItem={renderAccount}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addAccountContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  accountName: {
    fontSize: 16,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
