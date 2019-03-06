import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Text } from 'react-native';
import LanguageOption from './LanguageOption';
import translate from '../client';
import { TranslationInfo } from '../client/types';
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
  error?: Error;
}

export default class Translator extends Component<{}, State> {
  state: State = {
    language: Languages.Russian,
    input: ''
  };

  public render() {
    const { result, error } = this.state;
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
          onChangeText={this._handleTextChange}
          onSubmitEditing={this._handleSubmit}
        />
        {error ? <Text style={{ color: 'white' }}>{error.message}</Text> : null}
        {result ? <Results translations={result.translations} /> : null}
      </ScrollView>
    );
  }

  private _handleTextChange = (text: string) => {
    delete this.state.error;
    this.setState({ input: text });
  };

  private _handleLanguageChange = (idx: number) => {
    this.setState({ language: LANG_OPTIONS[idx] });
  };

  private _handleSubmit = async () => {
    const { language, input } = this.state;
    const to =
      language === Languages.Russian ? Languages.English : Languages.Russian;

    try {
      const res = await translate(language, to, input);
      this.setState({ result: res });
    } catch (error) {
      this.setState({ error });
    }
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
    paddingVertical: 15,
    marginBottom: 15
  }
});
