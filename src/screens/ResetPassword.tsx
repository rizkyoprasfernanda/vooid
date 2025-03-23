import {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import styles from '../constant/styles/styleResetPassword';
import Icon from '../assets/icons/Icons';
import {RootStackParamList} from '../App.tsx';
import {StackNavigationProp} from '@react-navigation/stack';

const ResetPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ResetPassword'>>();
  const email = route.params?.email;
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    repassword: '',
    mismatch: '',
  });

  console.log('📩 Email diterima di ResetPassword:', email);

  interface PasswordErrors {
    password: string;
    repassword: string;
    mismatch: string;
  }

  const validatePassword = (
    password: string,
    repassword: string,
  ): PasswordErrors => {
    let errors: PasswordErrors = {password: '', repassword: '', mismatch: ''};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    password = password.trim();
    repassword = repassword.trim();

    if (!password) {
      errors.password = 'Masukkan password baru';
    } else if (!passwordRegex.test(password)) {
      errors.password =
        'Password minimal terdiri dari 8 karakter, harus ada huruf & angka';
    }

    if (!repassword) {
      errors.repassword = 'Ketik ulang password baru';
    } else if (password !== repassword) {
      errors.mismatch = 'Password tidak sama';
    }

    return errors;
  };

  const handleResetPassword = async () => {
    console.log('📧 Email in handleResetPassword:', email);
    console.log('🔑 Password:', password);
    console.log('🔑 Repassword:', repassword);

    try {
      const response = await fetch('http://10.0.2.2:3000/reset-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email.trim(),
          newPassword: password.trim(),
        }),
      });

      const data = await response.json();
      console.log('🔍 Reset Password Response:', data);

      if (response.ok) {
        Alert.alert('Success', 'Password berhasil direset');
        navigation.navigate('SignIn');
      } else {
        if (
          data.error === 'Password tidak boleh sama dengan password sebelumnya'
        ) {
          Alert.alert(
            'Error',
            'Password baru tidak boleh sama dengan password lama',
          );
        } else {
          Alert.alert('Error', data.error || 'Gagal mereset password');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan jaringan');
    }
  };

  const handleSubmit = () => {
    const errors = validatePassword(password, repassword);
    if (errors.password || errors.repassword || errors.mismatch) {
      Alert.alert(
        'Error',
        errors.password || errors.repassword || errors.mismatch,
      );
      return;
    }
    handleResetPassword();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.resetPasswordLogoWrapper}>
            <Image
              style={styles.resetPasswordLogo}
              resizeMode="contain"
              source={require('../assets/images/welcome.png')}
            />
          </View>

          <View style={styles.resetPasswordTittleWrapper}>
            <Text style={styles.resetPasswordTittleText}>Set New Password</Text>
            <Text style={styles.resetPasswordText}>
              Must be at least 8 characters
            </Text>
          </View>

          <View style={styles.resetPasswordInputContainer}>
            <View style={styles.resetPasswordInputWrapper}>
              <Text style={styles.resetPasswordInputTitlle}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock" />
                <TextInput
                  style={[
                    styles.input,
                    errors.password ? styles.inputError : null,
                  ]}
                  placeholder="Enter password"
                  placeholderTextColor={errors.password ? 'red' : '#aaa'}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setErrors({...errors, password: '', mismatch: ''});
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eyeOpen' : 'eyeClose'} />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.resetPasswordInputWrapper}>
              <Text style={styles.resetPasswordInputTitlle}>
                Confirm Password
              </Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock" />
                <TextInput
                  style={[
                    styles.input,
                    errors.repassword ? styles.inputError : null,
                  ]}
                  placeholder="Retype password"
                  placeholderTextColor={errors.repassword ? 'red' : '#aaa'}
                  value={repassword}
                  onChangeText={text => {
                    setRePassword(text);
                    setErrors({...errors, repassword: '', mismatch: ''});
                  }}
                  secureTextEntry={!showRePassword}
                />
                <TouchableOpacity
                  onPress={() => setShowRePassword(!showRePassword)}>
                  <Icon name={showRePassword ? 'eyeOpen' : 'eyeClose'} />
                </TouchableOpacity>
              </View>
              {errors.mismatch ? (
                <Text style={styles.errorText}>{errors.mismatch}</Text>
              ) : null}
            </View>
          </View>

          <TouchableOpacity
            style={styles.resetPasswordButton}
            onPress={handleSubmit}>
            <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ResetPassword;
