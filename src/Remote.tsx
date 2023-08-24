import React from 'react';
import { isValidElementType } from 'react-is';
import define from './define';

// Add to global so that eval
// can find the define fn in
// global context.
(global as any).define = define;

interface Props {
  code: string;

  remoteProps?: {};
  [key: string]: any;
}

/**
 * Remote
 *
 * @param param RemoteProps
 * @param param.code
 * @param param.remoteProps
 * @returns JSX.Element
 */
export function Remote({ code, remoteProps, ...rest }: Props) {
  // eslint-disable-next-line no-eval
  const exports = eval(code as string);
  const RemoteComponent = exports?.default;

  if (isValidElementType(RemoteComponent)) {
    return <RemoteComponent {...rest} remoteProps={remoteProps} />;
  }
  return null;
}

export default React.memo(Remote);
