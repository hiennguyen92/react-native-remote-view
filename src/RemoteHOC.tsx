import React, { useEffect, useState } from 'react';
import Remote from './Remote';
import { ActivityIndicator } from 'react-native';

// TODO: Refactor

const withRemote =
  (LocalComponent: React.ComponentType) =>
  (remoteProps?: {}) => {
    const LocalComponentWithRemote = React.memo(function ({ ...rest }) {
      const [code, setCode] = useState<string | undefined>(undefined);
      const [isLoading, setIsLoading] = useState(false);

      const fetchResponse = async () => {
        fetch(
          'https://dl.dropboxusercontent.com/scl/fi/3fi3tz6etp1pkpgejl4be/data.json?rlkey=zwfdgyv3ktxoqj4gzvzf1qzic&dl=0'
        )
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
        setIsLoading(true);
        setTimeout(fetchResponse, 5000);
      }, []);

      if (isLoading) {
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
