import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Translation } from '../client/types';

const Result: FC<Translation> = props => {
  const { synonyms } = props;
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.text, styles.title]}>{props.translation}</Text>
        <Text style={styles.text}>{props.pos}</Text>
      </View>
      {synonyms ? (
        <View>
          {synonyms.map(syn => (
            <Text key={syn.text} style={styles.text}>
              {syn.text}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default Result;
