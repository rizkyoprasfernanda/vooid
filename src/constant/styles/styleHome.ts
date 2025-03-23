import {View, Text, StyleSheet} from 'react-native';
import {hp, wp} from '../helpers/common';
import React from 'react';

export const styles = StyleSheet.create({
  safeContainer: {
    display: 'flex',
    padding: 20,
    backgroundColor: '#FAFAFA',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerWrapperContainer: {
    flexDirection: 'row',
    height: hp(6),
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
  },

  headerIcon: {
    padding: 10,
    marginRight: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    resizeMode: 'contain',
  },
});
