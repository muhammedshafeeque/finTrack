import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';

export default function MenuScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: 'bar-chart-outline', title: 'Dashboard', route: '/dashboard' },
    { icon: 'list-outline', title: 'Transactions', route: '/transactions' },
    { icon: 'pricetags-outline', title: 'Categories', route: '/categories' },
    { icon: 'wallet-outline', title: 'Accounts', route: '/accounts' },
    { icon: 'pie-chart-outline', title: 'Reports', route: '/reports' },
    { icon: 'settings-outline', title: 'Settings', route: '/settings' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Menu' }} />
      <ThemedView style={styles.container}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route as never)}
          >
            <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
            <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: Colors.light.text,
  },
});
