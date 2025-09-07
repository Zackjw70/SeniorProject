import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backArrow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Text style={styles.appTitle}>App Title</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.loginHeader}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F2D',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  backArrow: {
    position: 'absolute',
    left: 20,
  },
  divider: {
    position: 'absolute',
    top: 90,
    width: '90%',
    height: 1,
    backgroundColor: '#fff',
  },
  loginHeader: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
  },
});
