import {StyleSheet} from 'react-native';
import {theme} from '../theme';
import {hp, wp} from '../helpers/common';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  welcomeWrapper: {
    marginTop: hp(5),
    marginBottom: 20,
  },

  welcomeText: {
    fontSize: 40,
    fontWeight: '900',
    color: theme.colors.primary,
    textAlign: 'left',
  },

  subText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    marginBottom: 10,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
  },

  input: {
    flex: 1,
    height: 45,
    fontSize: 15,
    paddingLeft: 10,
    color: '#333',
    borderBottomWidth: 0,
    textDecorationLine: 'none',
  },

  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  rememberMeWrapper: {
    flexDirection: 'row',
  },

  rememberMeText: {
    fontFamily: 'Montserrat-Medium',
    marginLeft: -10,
    fontSize: 13,
    color: '#333',
  },

  forgotPasswordText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: theme.colors.primary,
    textDecorationLine: 'none', // Menghapus garis bawah
  },

  signInButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginTop: 5,
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.gray,
    marginHorizontal: 10,
  },

  orText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#bbb',
    fontWeight: 'bold',
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    marginTop: 5,
    width: '100%',
    height: 45,
  },

  googleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },

  googleButtonText: {
    color: '#333',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },

  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  linkText: {
    fontFamily: 'Montserrat-Medium',
    color: '#333',
    fontSize: 13,
  },

  signUpText: {
    fontFamily: 'Montserrat-Medium',
    color: theme.colors.primary,
    fontSize: 13,
    paddingLeft: 2,
  },
});

export default styles;
