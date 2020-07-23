import FormData from 'form-data'
import { EnvConfig } from './env'
import { KeyboardTypes } from '../getKeyboard'

export interface RequestConfig {
  apiMethod: string;
  params?: string;
  data?: string | FormData;
  headers?: object;
  httpMethod?: 'POST' | 'GET';
  server?: string;
  keyType?: 'host'|'group';
}

export interface GetServerResponse {
  response: {
    server: string;
    ts: string;
    key: string;
  };
}

export interface NewMessageObject {
  message: {
    date: number;
    text: string;
    id: number;
    from_id: number;
    peer_id: number;
    random_id: number;
  };
}
export interface UpdateObject<T> {
  type: string;
  object: T;
}
export interface UpdateConfig<T> {
  updateObject: UpdateObject<T>;
  env: EnvConfig;
}

export interface UpdatesResponse {
  ts: string;
  updates: Array<UpdateObject<object>>;
  failed?: 1|2|3;
}
export interface NewMessageConfig {
  message?: string;
  attachment?: string;
  stickerId?: string;
  userId?: number;
  keyboardType?: KeyboardTypes;
}
