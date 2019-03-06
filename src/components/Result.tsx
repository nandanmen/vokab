import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Translation } from '../client/types';

const Result: FC<Translation> = props => {
  const { synonyms, meanings, examples } = props;
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={[styles.text, styles.title]}>{props.translation}</Text>
        <Text style={styles.text}>{props.pos}</Text>
      </View>
      {meanings ? (
        <View style={styles.container}>
          <Text style={styles.text}>{meanings.join(', ')}</Text>
        </View>
      ) : null}
      {synonyms ? (
        <View style={styles.container}>
          <Text style={[styles.text, styles.subTitle]}>Synonyms</Text>
          <View>
            {synonyms.map(syn => (
              <Text key={syn.text} style={styles.text}>
                {syn.text}
              </Text>
            ))}
          </View>
        </View>
      ) : null}
      {examples ? (
        <View style={styles.container}>
          <Text style={[styles.text, styles.subTitle]}>Examples</Text>
          <View>
            {examples.map(ex => (
              <View key={ex.text} style={styles.example}>
                <Text style={styles.text}>{ex.translation}</Text>
                <Text style={[styles.text, styles.caption]}>{ex.text}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 20
  },
  container: {
    marginBottom: 15
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  subTitle: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  caption: {
    fontStyle: 'italic',
    fontSize: 16
  },
  example: {
    marginBottom: 10
  }
});

export default Result;
