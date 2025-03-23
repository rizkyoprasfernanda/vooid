import {StyleSheet} from 'react-native';
import {theme} from '../theme'; // Pastikan path sesuai dengan lokasi theme Anda
import {hp, wp} from '../helpers/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingBottom: 30,
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeImage: {
    height: hp(30),
    width: wp(30),
    alignSelf: 'center',
  },

  welcomeText: {
    color: theme.colors.dark,
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },

  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.85),
    color: theme.colors.dark,
    marginTop: 20,
    fontFamily: 'Poopins-Medium',
  },

  welcomeContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Styling untuk Text Button
  textButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%', // Membuat tombol full width
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Wrapper untuk isi tombol agar ukuran tetap
  buttonContent: {
    height: hp(2.5), // Tetapkan tinggi agar tidak berubah
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButtonText: {
    color: theme.colors.white,
    fontSize: hp(1.725),
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },

  // Styling untuk Footer
  footerContainer: {
    flexDirection: 'row', // Agar teks dan login sejajar
    marginBottom: 20,
  },

  footerText: {
    color: theme.colors.dark,
    fontSize: hp(1.85),
    marginTop: 7,
    fontFamily: 'Poppins-Medium',
  },

  loginText: {
    color: theme.colors.primary,
    fontSize: hp(1.85),
    fontWeight: 'bold',
    marginTop: 7,
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;
