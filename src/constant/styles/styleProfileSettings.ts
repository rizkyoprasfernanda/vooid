import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {hp, wp} from '../helpers/common';
import {theme} from '../theme';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },

  container: {
    flex: 1,
  },

  profileSettingsTittleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButtonContainer: {},

  profileSettingsTittle: {},

  profileSettingsTittleText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#333',
  },

  profileSettingsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  profileImageWrapper: {
    marginBottom: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  inputWrapper: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
  },

  textInputTittle: {
    fontSize: 14,
    color: '#343434',
  },

  input: {
    height: 25,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 0,
    textDecorationLine: 'none',
  },

  inputBio: {
    height: 25,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 0,
    textDecorationLine: 'none',
  },

  updateProfileSettingsButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateProfileSettingsButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
