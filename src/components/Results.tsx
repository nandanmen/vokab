import React, { FC } from 'react';
import { Translation } from '../client/types';
import { View, StyleSheet } from 'react-native';
import Result from './Result';

type Props = {
  translations: Translation[];
};

const Results: FC<Props> = ({ translations }) => {
  return (
    <View style={styles.container}>
      {translations.map(tr => (
        <Result key={['tr', tr.translation].join('-')} {...tr} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  }
});

export default Results;
