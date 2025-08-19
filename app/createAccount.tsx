import { View, Text, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/database/lib/supabase';

export default function createAccount() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleCreateAccount = async () => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanEmail = email.trim();

    if (!cleanUsername || !cleanPassword || !cleanEmail) {
      alert('All fields are required');
      return;
    }

    

    const { data, error } = await supabase
      .from('usertable')
      .insert([
        {
          username: cleanUsername,
          password: cleanPassword,
          email: cleanEmail,
        },
      ]);

    console.log('raw input ->', { username, password, email })
    console.log('Login attempt →', { cleanUsername, cleanPassword, cleanEmail });
    console.log('Query result →', { data, error });

    if (error) {
      console.error('Insert error:', error);
      alert('Failed to create account');
    } else {
      alert('Account created!');
      router.replace('/login');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create Account</Text>

        <TextInput placeholder="Name" value={username} onChangeText={setUserName} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <Button title="Create Account" onPress={handleCreateAccount} />
    </View>
  );
}