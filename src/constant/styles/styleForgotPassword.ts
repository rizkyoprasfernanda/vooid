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
    fontSize: 13,
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

  forgotPasswordButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgotPasswordButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
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

  signInText: {
    color: theme.colors.primary,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    paddingLeft: 2,
  },
});

export default styles;
