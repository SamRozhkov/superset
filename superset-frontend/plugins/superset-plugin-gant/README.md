# superset-plugin-gant

Edit the `superset-frontend/src/visualizations/presets/MainPreset.js` and make the following changes:

```js
import { SupersetPluginGant } from 'superset-plugin-gant';
```

to import the plugin and later add the following to the array that's passed to the `plugins` property:
```js
new SupersetPluginGant().configure({ key: 'superset-plugin-gant' }),
```

