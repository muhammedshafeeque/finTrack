import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};

const sampleTransactions: Transaction[] = [
  { id: '1', date: '2023-04-15', description: 'Grocery Shopping', amount: -75.50, category: 'Food' },
  { id: '2', date: '2023-04-14', description: 'Salary', amount: 3000, category: 'Income' },
  { id: '3', date: '2023-04-13', description: 'Restaurant', amount: -45.00, category: 'Dining' },
  // Add more sample transactions...
];

export default function TransactionsScreen() {
  const router = useRouter();
  const [transactions] = useState<Transaction[]>(sampleTransactions);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons 
          name={item.amount >= 0 ? "arrow-down-circle" : "arrow-up-circle"} 
          size={40} 
          color={item.amount >= 0 ? Colors.success : Colors.error} 
        />
      </View>
      <View style={styles.transactionInfo}>
        <ThemedText style={styles.transactionDescription}>{item.description}</ThemedText>
        <ThemedText style={styles.transactionCategory}>{item.category}</ThemedText>
      </View>
      <View style={styles.transactionDetails}>
        <ThemedText style={[styles.transactionAmount, { color: item.amount >= 0 ? Colors.success : Colors.error }]}>
          ${Math.abs(item.amount).toFixed(2)}
        </ThemedText>
        <ThemedText style={styles.transactionDate}>{item.date}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Transactions',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/menu')} style={{ marginLeft: 15 }}>
              <Ionicons name="menu-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {/* Add new transaction logic */}}>
              <Ionicons name="add-circle-outline" size={24} color={Colors.primary} style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ThemedView style={styles.container}>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  transactionCategory: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
});
