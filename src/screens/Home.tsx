import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from '../assets/icons/Icons.tsx';
import {RootStackParamList} from '../App.tsx';
import {signOut} from '../services/googleAuth.ts';
import {styles} from '../constant/styles/styleHome.ts';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleSignOut = async () => {
    await signOut(navigation);
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.headerWrapperContainer}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={handleSignOut}>
              <View style={styles.headerIcon}>
                <Icon name="bell" />
              </View>
            </TouchableOpacity>

            <View style={styles.headerIcon}>
              <Icon name="message" />
            </View>
          </View>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../assets/images/defaultProfilePicture.jpg')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Home;
