import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {supabase} from './supabase';
import {Session} from '@supabase/supabase-js';
import {CommonActions} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

// Konfigurasi Google Sign-In
GoogleSignin.configure({
  webClientId:
    '530165107579-vsico5rifievl1epp5efmobpvi94i1ff.apps.googleusercontent.com', // Pastikan ini adalah Web Client ID dari Google Cloud
  offlineAccess: true,
});

export const signInWithGoogle = async (): Promise<Session | null> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('Google Sign-In Success:', JSON.stringify(userInfo, null, 2));

    // Pastikan mendapatkan idToken dengan benar
    const idToken = userInfo?.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token present!');
    }

    // Kirim token ke Supabase untuk autentikasi
    const {data, error} = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      console.error('Supabase sign-in error:', error.message);
      return null;
    } else {
      console.log('Supabase sign-in success:', data);
      return data.session;
    }
  } catch (error: any) {
    console.error('Sign-in error:', error.message);
    return null;
  }
};

export const signOut = async (
  navigation: NavigationProp<RootStackParamList>,
) => {
  try {
    console.log('Attempting to sign out...');
    await GoogleSignin.signOut();
    await supabase.auth.signOut();
    console.log('User signed out successfully');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  } catch (error) {
    console.error(
      'Sign-out error:',
      error instanceof Error ? error.message : error,
    );
  }
};
