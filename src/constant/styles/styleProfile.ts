import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {hp, wp} from '../helpers/common';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },

  container: {
    flex: 1,
  },

  headerContainer: {
    backgroundColor: '#FFF',
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },

  profileAccount: {
    flexDirection: 'row',
  },

  profileAccountName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },

  profileMenu: {},
  profileContainer: {
    backgroundColor: '#FFF',
  },

  profileWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },

  profileNameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  profileName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#333',
  },

  profileUsername: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#666666',
  },

  postFollowContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#F4F4F4',
    borderBottomColor: '#F4F4F4',
  },

  postFollowWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textPostFollow: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#333',
  },

  tittlePostFollow: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#777777',
  },

  storyContainer: {
    flexDirection: 'row',
  },

  storyWrapper: {
    width: wp(18),
    height: hp(13),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    marginRight: 10,
    overflow: 'hidden',
  },

  storyWrapperProfile: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },

  storyThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  storyWrapeprText: {
    marginTop: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: '#000',
  },

  postContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },

  postMentionWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  postMention: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },

  postMentionText: {
    paddingLeft: 3,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#343434',
  },

  postWrapper: {
    marginBottom: 10,
  },

  postHeader: {
    height: hp(8),
    alignItems: 'center',
    flexDirection: 'row',
  },

  postHeaderWrapper: {
    justifyContent: 'flex-start',
    marginRight: 10,
  },

  postProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  postName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#333',
  },

  postTime: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#666',
  },

  postBody: {
    paddingTop: 5,
    paddingBottom: 5,
  },

  textBody: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#333',
    paddingBottom: 5,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postPicture: {
    backgroundColor: 'f0f0f0',
    borderRadius: 8,
  },
});
