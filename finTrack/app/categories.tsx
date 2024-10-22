import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { api } from '@/services/api';

type Category = {
  id: string;
  name: string;
  icon: string;
};

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        await api.addCategory(newCategoryName);
        setNewCategoryName('');
        fetchCategories();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
      <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Categories' }} />
      <ThemedView style={styles.container}>
        <View style={styles.addCategoryContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Category Name"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />
          <TouchableOpacity style={styles.addButton} onPress={addCategory}>
            <Ionicons name="add" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategory}
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
  addCategoryContainer: {
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
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  categoryName: {
    marginLeft: 12,
    fontSize: 16,
  },
});
