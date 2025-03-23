import {StyleSheet} from 'react-native';
import {theme} from '../../constant/theme';

export const styles = StyleSheet.create({
  BackButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
});

export default styles;
