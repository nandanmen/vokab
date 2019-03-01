import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface Props {
  name: string;
  index: number;
  onPress: (idx: number) => void;
  isActive: boolean;
}

const LanguageOption: React.FC<Props> = ({
  name,
  index,
  onPress,
  isActive
}) => (
  <TouchableOpacity onPress={() => onPress(index)}>
    <Text
      style={isActive ? [styles.button, styles.activeButton] : styles.button}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

// styles

const styles = StyleSheet.create({
  button: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'white',
    marginRight: 20
  },
  activeButton: {
    fontWeight: 'bold'
  }
});

export default LanguageOption;
