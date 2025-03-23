import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../assets/icons/Icons.tsx';
import {supabase} from '../services/supabase.ts';
import {signInWithGoogle} from '../services/googleAuth.ts';
import styles from '../constant/styles/styleSignIn.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App.tsx';
import BackButton from '../component/BackButton.tsx';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomAlert from '../component/CustomAlert.tsx';

const SignIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const firstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      if (firstLaunch === null) {
        await AsyncStorage.setItem('isFirstLaunch', 'false');
        setIsFirstLaunch(true);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    const loadRememberUser = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (savedEmail) {
          setUserInput(savedEmail);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error loading email:', error);
      }
    };

    loadRememberUser();
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = async (isChecked: boolean) => {
    setRememberMe(isChecked);
    if (!isChecked) {
      await AsyncStorage.removeItem('rememberedEmail');
    }
  };

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let loginEmail: string = userInput.trim();

      if (!userInput.includes('@')) {
        // Ambil email dari username menggunakan Supabase RPC
        const {data, error: userProfileError} = await supabase.rpc(
          'get_user_email',
          {username_text: userInput},
        );

        if (userProfileError || !data) {
          setAlertMessage(
            'Username, email, atau password yang Anda masukkan salah.',
          );
          setAlertVisible(true);
          setLoading(false);
          return;
        }

        loginEmail = data as string;
      }

      // Supabase Login
      const {data: loginData, error} = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) {
        setAlertMessage(
          'Username, atau Email, atau Password yang Anda masukkan salah.',
        );
        setAlertVisible(true);
        setLoading(false);
        return;
      }

      console.log('Login success:', loginData);
      navigation.navigate('Home');
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat login. Silakan coba lagi.');
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const session = await signInWithGoogle();
      if (session) {
        Alert.alert('Login Successful', 'Welcome!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Google Sign-In was unsuccessful.');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Login Error', 'An error occurred while signing in.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          {!isFirstLaunch && navigation.canGoBack() && (
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
          )}
          <View style={styles.container}>
            <View style={styles.welcomeWrapper}>
              <Text style={styles.welcomeText}>Hey,</Text>
              <Text style={styles.welcomeText}>Welcome Back</Text>
            </View>
            <Text style={styles.subText}>Please login to continue</Text>

            {/* Input Email */}
            <View style={styles.inputWrapper}>
              <Icon name="email" />
              <TextInput
                style={styles.input}
                placeholder="Username or Email"
                placeholderTextColor="#aaa"
                value={userInput}
                onChangeText={setUserInput}
                underlineColorAndroid="transparent"
                keyboardType="email-address"
                autoCorrect={false}
                spellCheck={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Icon name="lock" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                <Icon name={showPassword ? 'eyeOpen' : 'eyeClose'} />
              </TouchableOpacity>
            </View>

            <View style={styles.rememberForgotContainer}>
              <View style={styles.rememberMeWrapper}>
                <BouncyCheckbox
                  size={17}
                  isChecked={rememberMe}
                  iconStyle={{
                    borderColor: rememberMe ? '#3a86ff' : '#e7e7e7',
                    borderWidth: 1.5,
                    borderRadius: 5,
                  }}
                  fillColor="#3a86ff"
                  innerIconStyle={{
                    borderWidth: 1.5,
                    borderRadius: 5,
                    borderColor: 'transparent',
                  }}
                  onPress={toggleRememberMe}
                />
                <Text style={styles.rememberMeText}>Remember Me</Text>
              </View>

              <View style={styles.rememberMeWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            <CustomAlert
              visible={alertVisible}
              message={alertMessage}
              onClose={() => setAlertVisible(false)}
            />

            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}>
              <Image
                source={require('../assets/icons/google.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.linkText}> Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
