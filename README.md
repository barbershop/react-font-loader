# FontLoader

React Component wrapper for [webfontloader](https://github.com/typekit/webfontloader)

***

## Demo & Examples

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-font-loader is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-font-loader.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-font-loader --save
```


## Usage

Choose a provider and font families to load.

```
var FontLoader = require('react-font-loader');

<FontLoader fontProvider="google" fontFamilies={['Source Code Pro:400']}>Example</FontLoader>
```

### Properties

* fontProvider: See [webfontloader](https://github.com/typekit/webfontloader) for web font provider examples
* fontFamilies: The font families to be loaded
* text (optional): A subset of text to load (only available for Google Fonts)
* typekitId: Required for Typekit fonts
* callbacks
	* onLoading: Called when all `fontFamilies` have been requested
	* onActive: Called when all of the `fontFamilies` have successfully downloaded
	* onInactive: Called when the browser does not support linked fonts, or all of the `fontFamilies` have failed to download
	* fontIsActive: Called when a specific font has downloaded
	* fontIsLoading: Called when a specific font is loading
	* fontLoadFailed: Called when an individual font can't be loaded

### Notes

WIP


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Copyright (c) 2017 Barbershop I/O.
