import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '../assets/icons/Icons';
import styles from '../constant/styles/styleForgotPassword';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import BackButton from '../component/BackButton';

const ForgotPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    if (loading) return;
    setLoading(true);

    navigation.navigate('VerificationForgotPassword', {email});

    try {
      const response = await fetch('http://10.0.2.2:3000/request-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });

      const data = await response.json();
      if (response.ok) {
      } else {
        Alert.alert('Error', data.error || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network request failed');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.backButtonContainer}>
            <BackButton />
          </View>
          <View style={styles.container}>
            <View style={styles.welcomeWrapper}>
              <Text style={styles.welcomeText}>Hey,</Text>
              <Text style={styles.welcomeText}>Forgot something?</Text>
            </View>
            <Text style={styles.subText}>Please submit your email address</Text>

            {/* Input Email */}
            <View style={styles.inputWrapper}>
              <Icon name="email" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                underlineColorAndroid="transparent"
              />
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={handleSendOTP}>
              <Text style={styles.forgotPasswordButtonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.linkText}>Remember something? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgotPassword;
