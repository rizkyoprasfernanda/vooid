import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  InteractionManager,
  Platform,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {styles} from '../constant/styles/styleVerificationForgotPassword';

const VerificationForgotPassword: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'VerificationForgotPassword'>>();
  const email = route.params?.email;
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const hiddenInputRef = useRef<TextInput | null>(null);
  const [cursorIndex, setCursorIndex] = useState(0); // Untuk menyimpan posisi kursor

  // Coutdown Resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  // Verifikasi OTP
  const handleVerifyOTP = async () => {
    const formattedOTP = otp.join('').replace(/,/g, '');
    try {
      const response = await fetch('http://10.0.2.2:3000/verify-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, otp: formattedOTP}),
      });
      const data = await response.json();
      console.log('Verify OTP Response:', data);
      console.log('Email sebelum navigasi ke ResetPassword:', email);

      if (response.ok) {
        navigation.navigate('ResetPassword', {email});
      } else {
        Alert.alert('Error', data.error || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network request failed');
    }
  };

  // Resend OTP
  const handleResendOTP = async (email: string) => {
    setIsResendDisabled(true);
    setCountdown(60);

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

  // Handle perubahan di input tersembunyi
  const handleHiddenInputChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, '').slice(0, 6);
    const newOtp = cleanedText.split('');

    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    setCursorIndex(newOtp.length); // Update posisi kursor
  };

  // Handle Keypress (Backspace)
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      cursorIndex > 0 &&
      otp[cursorIndex] === ''
    ) {
      setCursorIndex(cursorIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          style={styles.container}>
          <View>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../assets/images/welcome.png')}
              />
            </View>
            <Text style={styles.verificationOtpTittle}>Verify OTP</Text>
            <View style={styles.verificationOtpTextWrapper}>
              <Text style={styles.verificationOtpText}>
                Enter 6-Digit OTP number send to
              </Text>
              <Text style={styles.verificationEmailReceiver}>{email}</Text>
            </View>
            <View style={styles.OtpVerificationWrapper}>
              <TouchableOpacity
                style={styles.otpBoxWrapper}
                activeOpacity={1}
                onPress={() => hiddenInputRef.current?.focus()}>
                {otp.map((digit, index) => {
                  const isActive = index === otp.findIndex(d => d === ''); // Kotak input terakhir yang kosong
                  return (
                    <View key={index}>
                      {/* Kotak OTP */}
                      <View
                        style={[
                          styles.otpBox,
                          digit !== '' && styles.activeOtpBox,
                        ]}>
                        <Text style={styles.otpText}>{digit}</Text>
                      </View>
                      {/* Garis Bawah Terpisah */}
                      <View
                        style={[
                          styles.otpUnderline,
                          isActive && styles.otpUnderlineActive, // Ubah warna jika aktif
                        ]}
                      />
                    </View>
                  );
                })}
              </TouchableOpacity>

              <View>
                {/* Input Hidden (Menampung semua OTP) */}
                <TextInput
                  ref={hiddenInputRef}
                  style={styles.hiddenInput}
                  maxLength={6}
                  keyboardType="numeric"
                  value={otp.join('')}
                  onChangeText={handleHiddenInputChange}
                  onKeyPress={handleKeyPress}
                />
              </View>

              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyOTP}>
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.otpResendWrapper}>
              <Text style={styles.resendLinkText}>
                {countdown > 0
                  ? `Coba lagi dalam ${countdown}`
                  : 'Tidak menerima OTP?'}
              </Text>
              <TouchableOpacity
                disabled={isResendDisabled}
                onPress={() => handleResendOTP(email)}>
                <Text
                  style={[
                    styles.resendLink,
                    {color: isResendDisabled ? '#ccc' : '#3a86ff'},
                  ]}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default VerificationForgotPassword;
