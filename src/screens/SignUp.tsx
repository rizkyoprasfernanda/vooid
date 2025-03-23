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
import Icon from '../assets/icons/Icons';
import {supabase} from '../services/supabase';
import {signInWithGoogle} from '../services/googleAuth';
import styles from '../constant/styles/styleSignUp';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import BackButton from '../component/BackButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    repassword: '',
    checked: '',
  });

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const handleSignUp = async () => {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let newErrors = {
      email: email ? '' : 'Please enter an email',
      password: password ? '' : 'Please enter a password',
      repassword: repassword ? '' : 'Please retype your password',
      checked: '',
    };

    // Jika ada input yang kosong, hanya tampilkan error input
    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return;
    }

    // Validasi password minimal 8 karakter dengan huruf dan angka
    if (!passwordRegex.test(password)) {
      setErrors({
        email: '',
        password:
          'Password must be at least 8 characters and contain both letters and numbers',
        repassword: '',
        checked: '',
      });
      return;
    }

    // Jika password dan repassword tidak sama, tampilkan error hanya di atas tombol signup
    if (password !== repassword) {
      setErrors({
        email: '',
        password: '',
        repassword: '',
        checked: 'Passwords do not match',
      });
      return;
    }

    // Jika checkbox tidak dicentang, tampilkan error checkbox
    if (!checked) {
      setErrors({
        email: '',
        password: '',
        repassword: '',
        checked: 'You must agree to the terms and conditions',
      });
      return;
    }

    console.log('Attempting sign-up with:', {email});

    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    });

    console.log('Sign-Up Response:', {data, error});

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
    } else {
      Alert.alert('Success', 'Check your email for verification link');
      navigation.navigate('SignIn');
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          {!isFirstLaunch && navigation.canGoBack() && (
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
          )}
          <View style={styles.welcomeWrapper}>
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
          </View>
          <Text style={styles.subText}>
            Please fill this form to create account
          </Text>

          <View style={styles.inputWrapper}>
            <Icon name="email" />
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder={errors.email || 'Enter your email'}
              placeholderTextColor={errors.email ? 'red' : '#aaa'}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors({...errors, email: ''});
              }}
              underlineColorAndroid="transparent"
              keyboardType="email-address"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="lock" />
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder={errors.password || 'Create a password'}
              placeholderTextColor={errors.password ? 'red' : '#aaa'}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors({
                  ...errors,
                  password: '',
                  repassword: '',
                  checked: '',
                });
              }}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
              <Icon name={showPassword ? 'eyeOpen' : 'eyeClose'} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="lock" />
            <TextInput
              style={[
                styles.input,
                errors.repassword ? styles.inputError : null,
              ]}
              placeholder={errors.repassword || 'Retype your password'}
              placeholderTextColor={errors.repassword ? 'red' : '#aaa'}
              value={repassword}
              onChangeText={text => {
                setRePassword(text);
                setErrors({
                  ...errors,
                  password: '',
                  repassword: '',
                  checked: '',
                });
              }}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity onPress={handleToggleRePasswordVisibility}>
              <Icon name={showRePassword ? 'eyeOpen' : 'eyeClose'} />
            </TouchableOpacity>
          </View>

          <View style={styles.termsConditionContainer}>
            <View style={styles.termsConditionWrapper}>
              <BouncyCheckbox
                size={17}
                isChecked={checked}
                iconStyle={{
                  borderColor: checked ? '#3a86ff' : '#e7e7e7',
                  borderWidth: 1.5,
                  borderRadius: 5,
                }}
                fillColor="#3a86ff"
                innerIconStyle={{
                  borderWidth: 1.5,
                  borderRadius: 5,
                  borderColor: 'transparent',
                }}
                onPress={isChecked => {
                  setChecked(isChecked);
                  setErrors({...errors, checked: ''});
                }}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('TermsCondition')}>
                <Text style={styles.termsConditionText}>
                  I accept terms and conditions
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {(errors.repassword &&
            errors.repassword !== 'Please retype your password') ||
          errors.password ? (
            <View style={styles.termsConditionErrorWrapper}>
              <Text style={styles.errorText}>
                {errors.repassword || errors.password}
              </Text>
            </View>
          ) : null}

          {errors.checked ? (
            <View style={styles.termsConditionErrorWrapper}>
              <Text style={styles.errorText}>{errors.checked}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>

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
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.linkText}> Allready have account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
