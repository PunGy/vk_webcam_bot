import { KeyboardTypes } from '../getKeyboard'

export interface EnvConfig {
  API_URL: string;
  SECRET_KEY: string;
  MAX_SECRET_KEY: string;
  API_VERSION: string;
  GROUP_ID: number;
  ELENA_ID: number;
  MAXIM_ID: number;
  MODE: 'production'|'development';
}

export interface UserState {
  keyboard: KeyboardTypes;
}
export interface GlobalConfig {
  env: EnvConfig;
  mode: 'production'|'development';
  maximState: UserState;
  elenaState: UserState;
}
