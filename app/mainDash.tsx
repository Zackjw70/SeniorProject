import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function MainDash() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the Main Dashboard</Text>
      <Button title="Enter App Tabs" onPress={() => router.push('/(tabs)/dash')} />
    </View>
  );
}
