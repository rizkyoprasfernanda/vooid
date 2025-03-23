import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../theme';
import {hp, wp} from '../helpers/common';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resetPasswordLogoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  resetPasswordLogo: {
    width: wp(22),
    height: hp(22),
  },

  resetPasswordTittleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  resetPasswordTittleText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    color: '#333',
  },

  resetPasswordText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#666',
  },

  resetPasswordInputContainer: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },

  resetPasswordInputWrapper: {
    justifyContent: 'center',
    marginBottom: 10,
  },

  resetPasswordInputTitlle: {
    textAlign: 'left',
    marginBottom: 2,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 13,
    color: '#333',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: theme.colors.gray,
    borderRadius: 8,
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

  inputError: {
    borderWidth: 0,
  },

  resetPasswordButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetPasswordButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },

  termsConditionErrorWrapper: {
    width: '100%',
    height: 30,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default styles;
