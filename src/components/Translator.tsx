import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import LanguageOption from './LanguageOption';
import translate from '../client';
import { TranslationInfo } from '../client/types';
import Result from './Result';
import Results from './Results';

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
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
        {result ? <Results translations={result.translations} /> : null}
      </ScrollView>
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
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black'
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingVertical: 150
  },
  langOpts: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    color: 'white',
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E2',
    paddingVertical: 15
  }
});
