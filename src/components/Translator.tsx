import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import LanguageOption from './LanguageOption';

enum Languages {
  Russian = 'rus',
  English = 'eng'
}

const LANG_OPTIONS: Languages[] = [Languages.Russian, Languages.English];

interface State {
  language: Languages;
}

export default class Translator extends React.Component<{}, State> {
  state: State = {
    language: Languages.Russian
  };

  public render() {
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
        <TextInput style={styles.input} placeholder="Type here" />
      </View>
    );
  }

  private _handleLanguageChange = (idx: number) =>
    this.setState({ language: LANG_OPTIONS[idx] });
}

// styles

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
