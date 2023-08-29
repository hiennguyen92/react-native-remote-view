# react-native-remote-view

React Native Remote View

## Installation

```sh
npm install react-native-remote-view
```

## How to use

```js
withRemote(ComponentName)(fetchParams, [remoteProps])
```

- `ComponentName`: **Required.** Name of component.
- `fetchParams`: **Required.** `{ url: string; method?: string; headers?: {}; [key: string]: any; }``.
- `remoteProps`: **Optional.** It is an object which is passed as prop to remote component and is accessibe in remote code as one of the props.

Let's say, you have component called `Button` which you want to render using remote code and it is located at `Components/Button.js`.

> **NOTE:** Steps can be followed in any order.

### Step - Wrap component

```js
import withRemote from '../Remote'

function Button(props) {}

export default withRemote(Button)({ url: '' }, {
  someKey: someValue,
})
```

### Step - Copy-Paste component's code in CMS

Make sure, you remove the `withRemote` from copied code. Component's code in CMS must not contain `withRemote`.

```js
function Button(props) {}

export default Button
```

### Step - Provide dependencies

Dependency is module that is imported in component using `import`.

Open file `Remote/dependenciesMap.js`

The file has 3 sections. First section import `node_modules`, second section import those modules which are reusable and shared among multiple remote components and the third one is to import modules that are specific to some remote component. The sections are just for readabilty.

```js
/* node_modules. */
import React from 'react'
import * as ReactNative from 'react-native'

/* Local modules - used in multiple places. */
import * as Themes from '../Themes'

/* Specific to component. */
// Components/Button.js
// Import Button dependencies here.

export default {
  // node_modules
  react: React,
  'react-native': ReactNative,
  // Shared local modules.
  '../Themes': Themes,
  // Components/Button.js
  // Add Button dependencies here.
}
```

#### How to identify the dependencies for component

Check the `Button` compoenent below.

```js
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors, Fonts } from '../Themes'
import styles from './Styles/ButtonStyles'

function Button(props) {}
export default Button
```

4 modules are imported. In transpiled code, module's path after `from` becomes an identifier. For example, for `import React from 'react'`, `react` will become an identifier and for `import { Colors, Fonts } from '../Themes'`, `../Themes` will become a identifier.

Now, import these 4 modules in file `dependenciesMap.js` and add them to exported object.

1. You do not need to import and add module as dependency if it is already included.
2. Destructured import like `import { Colors, Fonts } from '../Themes'` must be imported like `import * as Themes from '../Themes'`

```js
import React from 'react'
import * as ReactNative from 'react-native'
import * as Themes from '../Themes'
import styles from '../Components/Styles/ButtonStyles'

export default {
  // node_modules
  react: React,
  'react-native': ReactNative,
  // Shared local modules.
  '../Themes': Themes,
  // Components/Button.js
  './Styles/ButtonStyles': styles,
}
```

## Transpile into AMD

The remote code is transpiled into AMD. In case, if you want to check the dependencies then check the first arg of type `array` in `define` function of transpiled code. Do not worry about `exports` value. It is automatically added by RemoteHOC.

```js
define([
  "exports",
  "prop-types",
  "react",
  "react-native-elements",
  "react-native",
  "../Themes",
], function (
  _exports,
  _propTypes,
  _react,
  _reactNativeElements,
  _reactNative,
  _Themes
) {
  "use strict";
  //...
}
```

