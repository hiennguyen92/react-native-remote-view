import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import withRemote, { Remote } from 'react-native-remote-view';

const code =
  'define(["exports","react","react-native"],function(_exports,_react,_reactNative){"use strict";Object.defineProperty(_exports,"__esModule",{value:true});_exports["default"]=void 0;_react=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}var _default=function _default(){return _react["default"].createElement(_reactNative.Text,null,"From Remote Component");};_exports["default"]=_default;});';

export default function App() {
  const LocalComponent = () => <Text>From Local Component</Text>;
  const WrappedComponent = withRemote(LocalComponent)();

  return (
    <View style={styles.container}>
      <Text>Text View</Text>
      <Remote code={code} />
      <WrappedComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
