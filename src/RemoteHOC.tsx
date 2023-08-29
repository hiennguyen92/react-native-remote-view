import React, { useEffect, useState } from 'react';
import Remote from './Remote';
import { type FetchParams } from './types';
import { ActivityIndicator } from 'react-native';

const withRemote =
  (LocalComponent: React.ComponentType) =>
  (fetchParams: FetchParams, remoteProps?: {}) => {
    const LocalComponentWithRemote = React.memo(function ({ ...rest }) {
      const [code, setCode] = useState<string | undefined>(undefined);
      const [isLoading, setIsLoading] = useState(false);

      const fetchResponse = async () => {
        setIsLoading(true);
        fetch(fetchParams.url, {
          ...fetchParams,
          method: fetchParams?.method ?? 'GET',
          headers: fetchParams?.headers ?? {},
        })
          .then((res) => res.text())
          .then((res) => {
            setIsLoading(false);
            return setCode(res);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error);
          });
      };

      useEffect(() => {
        fetchResponse();
      }, []);

      if (isLoading && code === undefined) {
        return <ActivityIndicator size={'small'} />;
      }

      // Can render remote component?
      if (code) {
        return <Remote {...rest} code={code!} remoteProps={remoteProps} />;
      }
      // Else, render local component.
      return <LocalComponent {...rest} />;
    });

    return LocalComponentWithRemote;
  };

export default withRemote;
