import {StyleSheet} from 'react-native';
import {theme} from '../theme';
import {hp, wp} from '../helpers/common';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  verificationOtpWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: wp(22),
    height: hp(22),
  },

  verificationOtpTittle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },

  verificationOtpTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  verificationOtpText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#555',
  },

  verificationEmailReceiver: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#555',
  },

  OtpVerificationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpBox: {
    width: 45,
    height: 50,
    backgroundColor: '#f2f8fe',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
    marginHorizontal: 5,
    borderRadius: 7,
  },

  activeOtpBox: {
    backgroundColor: '#f2f8fe',
  },

  otpText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#333',
  },

  otpUnderline: {
    width: 45,
    height: 3,
    backgroundColor: '#f2f8fe',
    marginTop: 8,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  otpUnderlineActive: {
    backgroundColor: theme.colors.primary,
  },

  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },

  verifyButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 45,
    borderRadius: 7,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },

  otpResendWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resendLinkText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#555',
  },

  resendLink: {
    paddingLeft: 2,
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: theme.colors.primary,
  },
});
