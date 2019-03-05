export interface TextResponse {
  text: string;
}

export interface Response {
  text: string;
  pos: string;
  tr: TranslationResponse[];
}

export interface TranslationResponse {
  text: string;
  pos: string;
  mean: TextResponse[];
  syn?: SynonymResponse[];
  ex?: ExampleResponse[];
}

export interface ExampleResponse extends TextResponse {
  tr: TextResponse[];
}

export interface SynonymResponse extends TextResponse {
  pos: string;
}

export interface Synonym {
  text: string;
  pos: string;
}

export interface Example {
  text: string;
  translation: string;
}

export interface Translation {
  translation: string;
  pos: string;
  meanings?: string[];
  synonyms?: Synonym[];
  examples?: Example[];
}

export interface TranslationInfo {
  input: string;
  pos: string;
  translations: Translation[];
}
