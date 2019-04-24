import axios from 'axios';
import { url } from '../../config';
import {
  Response,
  TextResponse,
  TranslationInfo,
  TranslationResponse,
  Translation
} from './types';

const http = axios.create();

export default async function translate(
  from: string,
  to: string,
  text: string
) {
  const params = {
    lang: `${from}-${to}`,
    text
  };
  const res = await http.post(url, null, { params });

  const translation: Response = res.data.def[0];
  if (!translation) throw new Error("Oops, we can't find that word.");

  return parse(translation);
}

function parse(res: Response): TranslationInfo {
  const input = res.text;
  const pos = res.pos;

  const translations = res.tr.map(parseTranslation);
  console.log(translations);
  return { input, pos, translations };
}

function parseTranslation(res: TranslationResponse) {
  const { text, pos, mean, syn, ex } = res;

  const result: Translation = {
    translation: text,
    pos
  };

  if (mean) {
    result.meanings = flatten(mean);
  }

  if (syn) {
    result.synonyms = syn.map(synonym => {
      const { text, pos } = synonym;
      return { text, pos };
    });
  }

  if (ex) {
    result.examples = ex.map(example => {
      return {
        text: example.text,
        translation: flatten(example.tr)[0]
      };
    });
  }

  return result;
}

const flatten = (arr: TextResponse[]) => arr.map(tx => tx.text);
