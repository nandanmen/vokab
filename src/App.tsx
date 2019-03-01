import React from 'react';
import { Text, View } from 'react-native';
import { Hello } from './components/Hello';

export default () => (
  <View style={{ marginTop: 50 }}>
    <Hello name="Nan" enthusiasmLevel={5} />
  </View>
);