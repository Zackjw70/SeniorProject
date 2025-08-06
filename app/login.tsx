import { View, Text, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  console.log(userName, password);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Page</Text>

      <TextInput placeholder="Name" value={userName} onChangeText={setUserName} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} />

      <Button title="Login" onPress={() => router.replace('/mainDash')} />
      <Button title="Create Account" onPress={() => router.push('/createAccount')} />
    </View>
  );
}