import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    const token = await getAuthToken();
    if (!token) {
      Alert.alert('Error', 'Token tidak ditemukan, silakan login ulang.');
      return;
    }

    const response = await fetch('http://10.0.2.2:3000/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      Alert.alert('Success', 'Password berhasil diubah');
    } else {
      Alert.alert('Error', data.error || 'Gagal mengubah password');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Old Password</Text>
        <TextInput
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <Text>New Password</Text>
        <TextInput
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text>Confirm Password</Text>
        <TextInput
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity onPress={handleChangePassword}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
