import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../constant/styles/styleProfile';
import Icon from '../assets/icons/Icons';
import ResposiveImage from '../services/autoResizeImage';
import {supabase} from '../services/supabase';
import LogoutModal from '../component/Logout';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [profile, setProfile] = useState({
    image: '',
    name: '',
    username: '',
    bio: '',
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchProfile = async () => {
    const {data: session} = await supabase.auth.getSession();
    if (!session?.session) return;

    const userId = session.session.user.id;
    const {data, error} = await supabase
      .from('users')
      .select('image, name, username, bio')
      .eq('id', userId)
      .single();

    if (error) console.error(error);
    else setProfile(data);
  };

  const handleLogout = async () => {
    try {
      // Tutup modal terlebih dahulu
      setModalVisible(false);

      // Panggil fungsi sign out dari Supabase
      const {error} = await supabase.auth.signOut();

      if (error) {
        console.error('Logout failed:', error.message);
        return;
      }

      console.log('User Logged Out');

      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.headerWrapper}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.profileAccount}>
                  <Text style={styles.profileAccountName}>
                    {profile.name || 'User'}
                  </Text>
                  <Icon name="arrowDown" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon name="menu" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <View style={styles.profileWrapper}>
              <View style={styles.profileImageWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileSettings')}>
                  <Image
                    source={
                      profile.image
                        ? {uri: profile.image}
                        : require('../assets/images/defaultProfilePicture.jpg')
                    }
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.profileNameWrapper}>
                <Text style={styles.profileName}>{profile.name || 'User'}</Text>
                <Text style={styles.profileUsername}>
                  @{profile.username || 'username'}
                </Text>
                <Text style={styles.profileBio}>{profile.bio}</Text>
              </View>

              <View style={styles.postFollowContainer}>
                <View style={styles.postFollowWrapper}>
                  <Text style={styles.textPostFollow}>75</Text>
                  <Text style={styles.tittlePostFollow}>Post</Text>
                </View>
                <View style={styles.postFollowWrapper}>
                  <Text style={styles.textPostFollow}>200K</Text>
                  <Text style={styles.tittlePostFollow}>Follower</Text>
                </View>
                <View style={styles.postFollowWrapper}>
                  <Text style={styles.textPostFollow}>397</Text>
                  <Text style={styles.tittlePostFollow}>Following</Text>
                </View>
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storyContainer}>
              <View style={styles.storyWrapper}>
                <Image
                  source={
                    profile.image
                      ? {uri: profile.image}
                      : require('../assets/images/defaultProfilePicture.jpg')
                  }
                  style={styles.storyWrapperProfile}
                />
                <Text style={styles.storyWrapeprText}>Add Story</Text>
              </View>
              <View style={styles.storyWrapper}>
                <Image
                  source={require('../assets/images/pict1.jpg')}
                  style={styles.storyThumbnail}
                />
              </View>
              <View style={styles.storyWrapper}>
                <Image
                  source={require('../assets/images/pict2.jpg')}
                  style={styles.storyThumbnail}
                />
              </View>
              <View style={styles.storyWrapper}>
                <Image
                  source={require('../assets/images/pict3.jpg')}
                  style={styles.storyThumbnail}
                />
              </View>
              <View style={styles.storyWrapper}>
                <Image
                  source={require('../assets/images/pict4.jpg')}
                  style={styles.storyThumbnail}
                />
              </View>
              <View style={styles.storyWrapper}>
                <Image
                  source={require('../assets/images/pict5.jpg')}
                  style={styles.storyThumbnail}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.postMentionWrapper}>
              <View style={styles.postMention}>
                <Icon name="post" />
                <Text style={styles.postMentionText}>Post</Text>
              </View>
              <View style={styles.postMention}>
                <Icon name="mention" />
                <Text style={styles.postMentionText}>Mention</Text>
              </View>
            </View>
            <View style={styles.postWrapper}>
              <View style={styles.postHeader}>
                <View style={styles.postHeaderWrapper}>
                  <Image
                    source={
                      profile.image
                        ? {uri: profile.image}
                        : require('../assets/images/defaultProfilePicture.jpg')
                    }
                    style={styles.postProfilePicture}
                  />
                </View>
                <View style={styles.postHeaderWrapper}>
                  <Text style={styles.postName}>{profile.name || 'User'}</Text>
                  <Text style={styles.postTime}>2 hours ago</Text>
                </View>
              </View>
              <View style={styles.postBody}>
                <Text style={styles.textBody}>Rinjani indonesia</Text>
                <ResposiveImage
                  source={require('../assets/images/pict1.jpg')}
                  style={styles.postPicture}
                />
              </View>
            </View>
          </View>
          {/* Modal Logout */}
          <LogoutModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onLogout={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
