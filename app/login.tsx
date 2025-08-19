import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/database/lib/supabase';
import React, { useState } from 'react';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  console.log(username, password);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    type UserRow = {
      userid: number;
      username: string;
      password: string;
      email: string;
    }

    const { data, error } = await supabase.from<UserRow>('usertable').select('*').ilike('username', username).eq('password', password).maybeSingle();
    //const { data, error } = await supabase.from<UserRow>('usertable').select('*').ilike('username', username).maybeSingle();

    console.log('raw input ->', { username, password })
    console.log('Login attempt →', { cleanUsername, cleanPassword });
    console.log('Query result →', { data, error });

    if (error) {
      setError('Invalid username or password');
    } else if (data) {
      // login successful -> go to dashboard
      router.replace('/mainDash');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Page</Text>

      <TextInput placeholder="Name" value={username} onChangeText={setUserName} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>

        {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
          <View style={{ height: 10 }} />
          <Button title="Create Account" onPress={() => router.push('/createAccount')} />
        </>
      )}
    </View>
  );
}