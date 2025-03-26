import {StyleSheet} from 'react-native';
import {theme} from '../../constant/theme';
import {hp, wp} from '../../constant/helpers/common';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  ModalCloseButtonWrapper: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ModalCloseButton: {
    width: 80,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.colors.gray,
  },

  logoutAccountWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  logoutAccountInfo: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  logoutAccountInfoWrapper: {
    marginRight: 10,
  },

  postProfilePicture: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },

  logoutAccountInfoName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#333',
  },

  accountLogoutWrapper: {},

  logoutButton: {
    backgroundColor: '#E50046',
    color: '#FFF',
    borderRadius: 7,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },

  logoutText: {
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },

  addAccountWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },

  addAccount: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAccountButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAccountText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default styles;
