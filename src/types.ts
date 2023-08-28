import { Platform } from 'react-native';

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
