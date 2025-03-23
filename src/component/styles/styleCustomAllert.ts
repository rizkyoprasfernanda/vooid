import {StyleSheet} from 'react-native';
import {theme} from '../../constant/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  alertTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },

  alertMessage: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },

  okButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  okButtonText: {
    fontFamily: 'Montserrat-Bold',
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
