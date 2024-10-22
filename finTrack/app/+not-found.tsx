import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Colors from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <ThemedView style={styles.container}>
        <Ionicons name="alert-circle-outline" size={64} color={Colors.primary} />
        <ThemedText style={styles.title}>Oops! Page Not Found</ThemedText>
        <ThemedText style={styles.message}>The screen you're looking for doesn't exist.</ThemedText>
        <Link href="/dashboard" asChild>
          <ThemedText style={styles.linkText}>
            <Ionicons name="home-outline" size={16} /> Go to Dashboard
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  linkText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
