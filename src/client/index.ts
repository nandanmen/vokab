import axios from 'axios';
import config from '../../config';
import { Translation } from './types';

const INTERVAL = 480000; // 8 mins in ms, 2 mins before token expires

const http = axios.create();

let token: string | null;

export async function requestToken() {
  token = null;
  const headers = {
    'Ocp-Apim-Subscription-Key': config.secret
  };
  try {
    const res = await http.post(config.authUrl, null, { headers });
    token = res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function translate(from: string, to: string, ...texts: string[]) {
  if (!token) await requestToken();
  const headers = {
    authorization: `Bearer ${token}`
  };
  const data = texts.map(text => {
    return { text };
  });
  try {
    const res = await http.post(config.baseUrl, data, {
      headers,
      params: {
        from,
        to
      }
    });
    console.log(res.data);
    const translations: Translation[] = res.data[0].translations;
    return translations.map(res => res.text);
  } catch (err) {
    console.error(err);
  }
}
