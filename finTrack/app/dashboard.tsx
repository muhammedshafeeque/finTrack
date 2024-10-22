import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { api } from '@/services/api';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState({ total: 0, income: 0, expenses: 0 });

  useEffect(() => {
    
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
   
    try {
      const data = await api.getBalance();
      setBalance({
        total: data.totalBalance,
        income: data.income,
        expenses: data.expenses
      });
    } catch (error) {
        console.log(error)
      console.error('Error fetching balance:', error);
    }
  };

  const quickActions = [
    { icon: 'add-circle-outline', title: 'Add Income', color: Colors.success, action: () => router.push('/add-income' as never) },
    { icon: 'remove-circle-outline', title: 'Add Expense', color: Colors.error, action: () => router.push('/add-expense' as never) },
    { icon: 'wallet-outline', title: 'Set Budget', color: Colors.warning, action: () => router.push('/set-budget' as never) },
    { icon: 'pie-chart-outline', title: 'View Reports', color: Colors.info, action: () => router.push('/reports' as never) },
  ];

  const navigationButtons = [
    { icon: 'list-outline', title: 'Transactions', route: '/transactions' },
    { icon: 'pricetags-outline', title: 'Categories', route: '/categories' },
    { icon: 'wallet-outline', title: 'Accounts', route: '/accounts' },
    { icon: 'settings-outline', title: 'Settings', route: '/settings' },
  ];

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'FinTrack',
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/menu' as never)} style={styles.headerButton}>
              <Ionicons name="menu-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          {/* Balance Card */}
          <ThemedView style={styles.balanceCard}>
            <ThemedText style={styles.balanceTitle}>Total Balance</ThemedText>
            <ThemedText style={styles.balanceValue}>₹{balance.total.toFixed(2)}</ThemedText>
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Ionicons name="arrow-up-outline" size={24} color={Colors.success} />
                <ThemedText style={styles.balanceItemValue}>₹{balance.income.toFixed(2)}</ThemedText>
                <ThemedText style={styles.balanceItemTitle}>Income</ThemedText>
              </View>
              <View style={styles.balanceItem}>
                <Ionicons name="arrow-down-outline" size={24} color={Colors.error} />
                <ThemedText style={styles.balanceItemValue}>₹{balance.expenses.toFixed(2)}</ThemedText>
                <ThemedText style={styles.balanceItemTitle}>Expenses</ThemedText>
              </View>
            </View>
          </ThemedView>
          
          {/* Quick Actions */}
          <ThemedView style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.quickActionButton, { backgroundColor: action.color }]}
                onPress={action.action}
              >
                <Ionicons name={action.icon as any} size={32} color={Colors.white} />
                <ThemedText style={styles.quickActionText}>{action.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
          
          {/* Navigation Buttons */}
          <ThemedView style={styles.navigationContainer}>
            {navigationButtons.map((button, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.navigationButton}
                onPress={() => router.push(button.route as never)}
              >
                <Ionicons name={button.icon as any} size={24} color={Colors.primary} />
                <ThemedText style={styles.navigationButtonText}>{button.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
          
          {/* Recent Transactions */}
          <ThemedView style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.cardTitle}>Recent Transactions</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.viewAllText}>View All</ThemedText>
              </TouchableOpacity>
            </View>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.transactionItem}>
                <Ionicons name="cart-outline" size={24} color={Colors.primary} />
                <View style={styles.transactionInfo}>
                  <ThemedText style={styles.transactionTitle}>Shopping</ThemedText>
                  <ThemedText style={styles.transactionDate}>June 15, 2023</ThemedText>
                </View>
                <ThemedText style={styles.transactionAmount}>-₹3,750.00</ThemedText>
              </View>
            ))}
          </ThemedView>
          
          {/* Spending by Category */}
          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>Spending by Category</ThemedText>
            {/* Add a pie chart for spending by category */}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  headerButton: {
    padding: 8,
  },
  balanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceTitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
  },
  balanceValue: {
    paddingTop:20,
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    marginVertical: 10,
    
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceItemTitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  balanceItemValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginVertical: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    width: (screenWidth - 48) / 2,
    aspectRatio: 1,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quickActionText: {
    color: Colors.white,
    marginTop: 10,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  viewAllText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.gray,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.error,
  },
  navigationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navigationButton: {
    width: (screenWidth - 48) / 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationButtonText: {
    color: Colors.primary,
    marginTop: 8,
    fontWeight: 'bold',
  },
});
