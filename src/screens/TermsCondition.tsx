import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import BackButton from '../component/BackButton';
import {RootStackParamList} from '../App';

const TermsCondition = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>TermsCondition</Text>
      <BackButton />
    </View>
  );
};

export default TermsCondition;
