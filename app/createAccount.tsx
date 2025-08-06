import { View, Text, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create Account</Text>

        <TextInput placeholder="Name" value={userName} onChangeText={setUserName} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <Button title="Create Account" onPress={() => router.replace('/login')} />
    </View>
  );
}