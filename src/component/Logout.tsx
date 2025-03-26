import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles/styleLogout';
import {supabase} from '../services/supabase';

interface LogoutModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isVisible,
  onClose,
  onLogout,
}) => {
  const [profile, setProfile] = useState({
    image: '',
    name: '',
    username: '',
  });

  // Fungsi Fetch Data dari Supabase
  const fetchProfile = async () => {
    const {data: session} = await supabase.auth.getSession();
    if (!session?.session) return;

    const userId = session.session.user.id;
    const {data, error} = await supabase
      .from('users')
      .select('image, name, username')
      .eq('id', userId)
      .single();

    if (error) console.error(error);
    else setProfile(data);
  };

  useEffect(() => {
    if (isVisible) {
      fetchProfile();
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.ModalCloseButtonWrapper}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.ModalCloseButton}></TouchableOpacity>
        </View>
        <View style={styles.logoutAccountWrapper}>
          {/* Profil User */}
          <View style={styles.logoutAccountInfo}>
            <View style={styles.logoutAccountInfoWrapper}>
              <Image
                source={
                  profile.image
                    ? {uri: profile.image}
                    : require('../assets/images/defaultProfilePicture.jpg')
                }
                style={styles.postProfilePicture}
              />
            </View>
            <View style={styles.logoutAccountInfoWrapper}>
              <Text style={styles.logoutAccountInfoName}>
                {profile.name || 'User'}
              </Text>
            </View>
          </View>
          <View style={styles.accountLogoutWrapper}>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addAccountWrapper}>
          <View style={styles.addAccount}>
            <TouchableOpacity style={styles.addAccountButton}>
              <Text style={styles.addAccountText}>Add Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
