import {Pressable} from 'react-native';
import styles from './styles/styleBackButton';
import Icon from '../assets/icons/Icons';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation(); // Panggil useRouter di dalam komponen

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={styles.BackButton} // Menggunakan style yang sudah ada
    >
      <Icon
        name="back" // Sesuaikan dengan ikon yang Anda gunakan
      />
      {/* Menggunakan ikon yang benar */}
    </Pressable>
  );
};

export default BackButton;
