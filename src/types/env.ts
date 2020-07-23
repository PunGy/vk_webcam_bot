import { KeyboardTypes } from '../getKeyboard'

export interface EnvConfig {
  API_URL: string;
  SECRET_KEY: string;
  HOST_SECRET_KEY: string;
  API_VERSION: string;
  GROUP_ID: number;
  RECIVER_ID: number;
  HOST_ID: number;
  MODE: 'production'|'development';
}

export interface UserState {
  keyboard: KeyboardTypes;
}
export interface GlobalConfig {
  env: EnvConfig;
  mode: 'production'|'development';
  hostState: UserState;
  reciverState: UserState;
}
