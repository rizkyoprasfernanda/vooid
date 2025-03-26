import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {supabase} from '../services/supabase';
import {styles} from '../constant/styles/styleProfileSettings';
import {RootStackParamList} from '../App';
import BackButton from '../component/BackButton';

const ProfileSettings = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [profile, setProfile] = useState({
    image: '',
    name: '',
    username: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Error loading profile from AsyncStorage:', error);
      }
    };

    const fetchProfile = async () => {
      const {data: user, error} = await supabase.auth.getUser();
      if (error || !user.user) return;

      const {data, error: profileError} = await supabase
        .from('users')
        .select('image, name, username, bio')
        .eq('id', user.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profile => ({...profile, ...data}));
        await AsyncStorage.setItem('userProfile', JSON.stringify(data)); // Simpan ke AsyncStorage
      }
    };

    loadProfile();
    fetchProfile();
  }, []);

  const pickImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel || response.errorMessage) return;
      if ((response.assets ?? []).length > 0) {
        const file = (response.assets ?? [])[0]?.uri;
        setProfile({...profile, image: file ?? ''});
      }
    });
  };

  const handleUsernameCheck = async (username: string) => {
    if (!username || username === profile.username) {
      setErrorMessage('');
      return;
    }

    const {data, error} = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking username:', error);
      return;
    }

    if (data) {
      setErrorMessage('Username sudah digunakan');
    } else {
      setErrorMessage('');
    }
  };

  const handleSaveProfile = async () => {
    if (errorMessage) {
      Alert.alert('Error', 'Perbaiki error sebelum menyimpan');
      return;
    }

    setLoading(true);
    const {data: user, error} = await supabase.auth.getUser();
    if (error || !user.user) {
      Alert.alert('Error', 'Gagal mendapatkan data user');
      setLoading(false);
      return;
    }

    const updatedProfile = {
      bio: profile.bio,
      name: profile.name,
      username: profile.username,
      image: profile.image,
    };

    const {error: updateError} = await supabase
      .from('users')
      .update(updatedProfile)
      .eq('id', user.user.id);

    if (updateError) {
      Alert.alert('Error', 'Gagal memperbarui profil');
    } else {
      Alert.alert('Sukses', 'Profil berhasil diperbarui');
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile)); // Simpan ke AsyncStorage
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.profileSettingsTittleWrapper}>
            <View style={styles.profileSettingsTittle}>
              <Text style={styles.profileSettingsTittleText}>
                Profile Settings
              </Text>
            </View>
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
          </View>

          <View style={styles.profileSettingsWrapper}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.profileImageWrapper}>
              <Image
                source={
                  profile.image
                    ? {uri: profile.image}
                    : require('../assets/images/defaultProfilePicture.jpg')
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <Text style={styles.textInputTittle}>Name</Text>
              <TextInput
                value={profile.name}
                onChangeText={text => setProfile({...profile, name: text})}
                placeholder="Nama"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.textInputTittle}>Username</Text>
              <TextInput
                value={profile.username}
                onChangeText={text => {
                  setProfile({...profile, username: text});
                  setErrorMessage('');
                }}
                onBlur={() => handleUsernameCheck(profile.username)}
                placeholder="Username"
                style={styles.input}
              />
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.textInputTittle}>Bio</Text>
              <TextInput
                value={profile.bio}
                onChangeText={text => setProfile({...profile, bio: text})}
                placeholder="Bio"
                style={styles.inputBio}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.updateProfileSettingsButton}
            onPress={handleSaveProfile}
            disabled={loading}>
            <Text style={styles.updateProfileSettingsButtonText}>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ProfileSettings;
