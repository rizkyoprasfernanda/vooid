import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {supabase} from '../services/supabase';
import {theme} from '../constant/theme';
import styles from '../constant/styles/styleWelcome';
import {RootStackParamList} from '../App';

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        setCheckingSession(true);

        // Cek apakah aplikasi baru pertama kali dibuka
        const firstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (firstLaunch === null) {
          await AsyncStorage.setItem('isFirstLaunch', 'false');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }

        // Cek apakah user sudah login dengan Supabase
        const {data, error} = await supabase.auth.getSession();
        console.log('Supabase Session Response:', data);

        if (error) {
          console.error('Supabase Auth Error:', error.message);
        }

        if (data?.session?.user) {
          // Jika sudah login, arahkan ke Home
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else if (firstLaunch !== null) {
          // Jika bukan pertama kali buka aplikasi, langsung ke SignIn
          navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
        }
      } catch (error) {
        console.error('Error checking app state:', error);
      } finally {
        setCheckingSession(false);
      }
    };

    checkAppState();
  }, []);

  if (checkingSession) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require('../assets/images/welcome.png')}
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>VooID</Text>
        <Text style={styles.punchline}>
          Where every thought finds a home and every image tells a story.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.textButton}
        disabled={loading}>
        <View style={styles.buttonContent}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text style={styles.textButtonText}>Get Started</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
