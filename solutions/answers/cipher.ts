import CryptoJS from 'crypto-js';

export function encrypt(data: string): string {
  const key = import.meta.env.VITE_ANSWER_PASSWORD;
  const result = CryptoJS.AES.encrypt(data, key);

  return result.toString();
}

export function decrypt(data: string): string {
  const key = import.meta.env.VITE_ANSWER_PASSWORD;
  const result = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);

  return result;
}
