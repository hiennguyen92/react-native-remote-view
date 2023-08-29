import { Platform } from 'react-native';

export interface FetchParams {
  url: string;
  method?: string;
  headers?: {};
  [key: string]: any;
}

export interface ComponentParams {
  path: string;
  version?: string;
  platform?: Platform;
}
export interface Component {
  id: string;
  path: string;
  version: string;
  code: string;
}
