import React from 'react';
import { Text, View, TextInput } from 'react-native';
import Translator from './components/Translator';

export default () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Translator />
    </View>
  );
};
