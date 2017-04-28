# FontLoader

React Component wrapper for [Web Font Loader](https://github.com/typekit/webfontloader)

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

The `FontLoader` can be included within any React Component. It's render method returns `null`.

There are 2 required props:
* `fontProvider` One of 'google', 'typekit', 'fontdeck', 'monotype', or 'custom'
* `fontFamilies` Array of font styles to load

For Example:

```jsx
<FontLoader
	fontProvider="google"
	fontFamilies={['Source Code Pro:400']}
/>
```

### Behavior

A few props can control the behavior of a `FontLoader`

* `fonts` Object containing fonts that have alreay been downloaded (this may be provided by i.e. a Redux object)
* `timeout` Timeout after which the Web Font Loader reports font(s) inactive. Default is 3000
* `classes` If true, the Web Font Loader will add classes to the `html` element. Recommended to set `false` in keeping with the React paradigm. Default is false
* `debug` If true, logs additional event info to the console. Default is false.

### Provider Specific Properties

#### Google

Fonts loaded from Google can be automatically subsetted by passing a `text` prop.

```jsx
<FontLoader
	fontProvider="google"
	fontFamilies={[
		'Open Sans:400'
	]}
	text="Welcome to Barbershop"
/>
```

#### TypeKit

Typekit needs a `typekitId` prop to load the fonts.

```jsx
<FontLoader
	fontProvider="typekit"
	fontFamilies={[…]}
	typekitId="xxxxxx"
/>
```

##### Adobe Edge Web Fonts

To load Adobe Edge Web Fonts, pass a `typekitAPI` prop with the Edge Fonts URL.

```jsx
<FontLoader
	fontProvider="typekit"
	fontFamilies={[…]}
	typekitId="xxxxxx"
	typekitAPI="//use.edgefonts.net"
/>
```

#### Fontdeck

To load fonts from Fontdeck, pass a `fontdeckId` prop that corresponds to the ID of your site.

```jsx
<FontLoader
	fontProvider="fontdeck"
	fontFamilies={[…]}
	fontdeckId="xxxxxx"
/>
```

#### Fonts.com

There are several additional props for Fonts.com:
* `monotypeProjectId` The project ID (Required)
* `monotypeVersion` Optional for cache-busting
* `monotypeLoadAllFonts` Optional boolean

```jsx
<FontLoader
	fontProvider="monotype"
	fontFamilies={[…]}
	monotypeProjectId="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
	monotypeVersion="8675309"
	monotypeLoadAllFonts={false}
/>
```

#### Custom

Custom fonts include the option to pass a `customUrls` array of stylesheets.

```jsx
<FontLoader
	fontProvider="custom"
	fontFamilies={[…]}
	customUrls={['/mycustomfonts.css']}
/>
```

### Events

The following optional props can be passed to leverage the Web Font Loader event system:

* Triggered for all fonts passed to the `FontLoader`
	* `onLoading` Triggered when all fonts have been requested
	* `onActive` Triggered when all of the fonts have successfully loaded
	* `onInactive` Triggered when the browser doesn't support linked fonts or none of the fonts could be loaded
* Triggered for _each_ font and include `familyName` and `fvd` for that font
	* `fontIsLoading`
	* `fontIsLoaded`
	* `fontLoadFailed`

### Notes

* [Web Font Loader Documentation](https://github.com/typekit/webfontloader)
* Original README for generator: [React Component Generator](https://github.com/JedWatson/generator-react-component)
* [Typekit](https://typekit.com/)
* [Google Fonts](https://fonts.google.com/)
* [Fontdeck](http://fontdeck.com/)
* [Fonts.com](https://www.fonts.com/)

## License

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Copyright (c) 2017 Barbershop I/O.
