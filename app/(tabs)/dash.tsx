import { Image } from 'expo-image';
import { Button, Modal, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen() {
  type Item = {
    name: string;
    type: string;
    value: number;
    tag: string;
    date: string;
  };
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [tag, setTag] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const saveItem = async () => {
    if (!name || !type || !value || !tag) {
      alert('Please fill all fields');
      return;
    }

    useEffect(() => {
      loadItems();
    }, []);

    const newItem = {
      name,
      type,
      value: parseFloat(value),
      tag,
      date: date.toISOString()  // Save date as ISO format
    };

    try {
      const existingItems = await AsyncStorage.getItem('storedItems');
      const itemsArray = existingItems ? JSON.parse(existingItems) : [];
      const updatedItems = [...itemsArray, newItem];
      await AsyncStorage.setItem('storedItems', JSON.stringify(updatedItems));
      setItems(updatedItems);
      setName('');
      setType('');
      setValue('');
      setTag('');
      setDate(new Date()); // Reset to default
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving item', error);
    }
  };
  const loadItems = async () => {
    try {
      const storedData = await AsyncStorage.getItem('storedItems');
      if (storedData) setItems(JSON.parse(storedData));
    } catch (error) {
      console.error('Error loading items', error);
    }
  };



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
         <Button title="Back to Main Dashboard" onPress={() => router.replace('/mainDash')} />

          <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ThemedView style={styles.modalContainer}>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Type" value={type} onChangeText={setType} style={[styles.input, styles.hidden]} />
          <TextInput placeholder="Value" value={value} onChangeText={setValue} keyboardType="numeric" style={styles.input} />
          <TextInput placeholder="Tag" value={tag} onChangeText={setTag} style={styles.input} />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerContainer}>
            <ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>
            <AntDesign name="caretdown" size={16} color="gray" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Button title="Save" onPress={saveItem} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </ThemedView>
      </Modal>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: 'black', alignItems: 'center', padding: 10 },
  appSummary: { flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginVertical: 10 },
  summaryText: { fontSize: 20 },
  titleContainer: { paddingTop: 50, backgroundColor: 'black' },
  listItem: { padding: 10, borderBottomWidth: 1, color: 'white' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  input: { width: '80%', padding: 10, margin: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5 },
  fab: { position: 'absolute', bottom: 110, right: 30, backgroundColor: 'blue', padding: 15, borderRadius: 30, alignItems: 'center' },
  hidden: { display: 'none' },
  datePickerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '80%', 
    padding: 10, 
    margin: 10, 
    borderWidth: 1, 
    borderColor: 'gray', 
    borderRadius: 5
  },
  dateText: {
    fontSize: 16,
    color: 'black'
  },
  reactLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40
  }
});