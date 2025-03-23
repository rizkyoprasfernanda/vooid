import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../constant/styles/styleProfile';
import Icon from '../assets/icons/Icons';
import ResposiveImage from '../services/autoResizeImage';

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerWrapper}>
              <View style={styles.profileAccount}>
                <Text style={styles.profileAccountName}>Aruniqa</Text>
                <Icon name="arrowDown" />
              </View>
              <View style={styles.profileMenu}>
                <Icon name="menu" />
              </View>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileWrapper}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={require('../assets/images/defaultProfilePicture.jpg')}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.profileNameWrapper}>
                <Text style={styles.profileName}>Aruniqa</Text>
                <Text style={styles.profileUsername}>@aruniqa</Text>
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
                  source={require('../assets/images/defaultProfilePicture.jpg')}
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
                    source={require('../assets/images/defaultProfilePicture.jpg')}
                    style={styles.postProfilePicture}
                  />
                </View>
                <View style={styles.postHeaderWrapper}>
                  <Text style={styles.postName}>Aruniqa</Text>
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
            <View style={styles.postWrapper}>
              <View style={styles.postHeader}>
                <View style={styles.postHeaderWrapper}>
                  <Image
                    source={require('../assets/images/defaultProfilePicture.jpg')}
                    style={styles.postProfilePicture}
                  />
                </View>
                <View style={styles.postHeaderWrapper}>
                  <Text style={styles.postName}>Aruniqa</Text>
                  <Text style={styles.postTime}>1 days ago</Text>
                </View>
              </View>
              <View style={styles.postBody}>
                <Text style={styles.textBody}>Wonderfull</Text>
                <ResposiveImage
                  source={require('../assets/images/pict6.jpg')}
                  style={styles.postPicture}
                />
              </View>
            </View>
            <View style={styles.postWrapper}>
              <View style={styles.postHeader}>
                <View style={styles.postHeaderWrapper}>
                  <Image
                    source={require('../assets/images/defaultProfilePicture.jpg')}
                    style={styles.postProfilePicture}
                  />
                </View>
                <View style={styles.postHeaderWrapper}>
                  <Text style={styles.postName}>Aruniqa</Text>
                  <Text style={styles.postTime}>2 days ago</Text>
                </View>
              </View>
              <View style={styles.postBody}>
                <Text style={styles.textBody}>Wonderfull</Text>
                <ResposiveImage
                  source={require('../assets/images/pict2.jpg')}
                  style={styles.postPicture}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
