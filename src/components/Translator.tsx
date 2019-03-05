import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import LanguageOption from './LanguageOption';
import translate from '../client';
import { TranslationInfo } from '../client/types';

enum Languages {
  Russian = 'ru',
  English = 'en'
}

const LANG_OPTIONS: Languages[] = [Languages.Russian, Languages.English];

interface State {
  language: Languages;
  input: string;
  result?: TranslationInfo;
}

export default class Translator extends Component<{}, State> {
  state: State = {
    language: Languages.Russian,
    input: ''
  };

  public render() {
    const { result } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.langOpts}>
          {LANG_OPTIONS.map((lg, idx) => (
            <LanguageOption
              key={lg}
              name={lg}
              index={idx}
              onPress={this._handleLanguageChange}
              isActive={this.state.language === lg}
            />
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={this.state.input}
          onChangeText={text => this.setState({ input: text })}
          onSubmitEditing={this._handleSubmit}
        />
        {result ? (
          <View>
            <Text style={{ color: 'white' }}>{result.toString()}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  private _handleLanguageChange = (idx: number) =>
    this.setState({ language: LANG_OPTIONS[idx] });

  private _handleSubmit = () => {
    const { language, input } = this.state;
    const to =
      language === Languages.Russian ? Languages.English : Languages.Russian;

    translate(language, to, input)
      .then(res => this.setState({ result: res }))
      .catch(err => console.error(err));
  };
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30
  },
  langOpts: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    color: 'white',
    fontSize: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E2',
    paddingVertical: 15
  }
});
