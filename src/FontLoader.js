import React, { Component, PropTypes } from 'react';

const createFontQuery = (fontFamilyName, stylesArray) => {
	const stylesString = stylesArray.join(',');
	const fontQuery = fontFamilyName + ':' + stylesString;
	if (stylesString.length === 0) return false;
	return fontQuery;
};

const checkLoadedFonts = (family, fonts) => {
	const familyName = family.split(':')[0];
	const styles = family.split(':')[1].split(',');
	const stylesToLoad = [];
	styles.forEach((style, index) => {
		const weight = style.charAt(0);
		const classification = style.charAt(3) || 'n';
		const styleToCheck = classification + weight;
		if (fonts && (!(familyName + ' ' + styleToCheck in fonts) || (familyName + ' ' + styleToCheck in fonts && fonts[(familyName + ' ' + styleToCheck)].subset))) {
			stylesToLoad.push(styles[index]);
		}
	});
	const fontQuery = (createFontQuery(familyName, stylesToLoad));
	return fontQuery;
};

export default class FontLoader extends Component {
	componentDidMount() {
		const { fonts, fontProvider, fontFamilies } = this.props;
		const stylesToLoad = [];

		if (fontFamilies) {
			fontFamilies.forEach((family) => {
				const inactiveFonts = checkLoadedFonts(family, fonts);
				if (inactiveFonts) stylesToLoad.push(inactiveFonts);
			});
			if (stylesToLoad && stylesToLoad.length > 0) {
				this.loadFonts(fontProvider, stylesToLoad);
			}
		} else {
			this.loadFonts(fontProvider);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	loadFonts(fontProvider, stylesToLoad) {
		const {
			onActive,
			onInactive,
			onLoading,
			fontIsLoading,
			fontIsLoaded,
			fontLoadFailed,
			typekitId,
			typekitAPI,
			fontdeckId,
			monotypeProjectId,
			monotypeVersion,
			monotypeLoadAllFonts,
			customUrls,
			timeout,
			text,
			debug,
			classes } = this.props;
		const WebFont = require('webfontloader');

		WebFont.load({
			[fontProvider]: {
				families: stylesToLoad,
				id: typekitId || fontdeckId,
				projectId: monotypeProjectId,
				version: monotypeVersion,
				loadAllFonts: monotypeLoadAllFonts,
				api: typekitAPI || '',
				urls: customUrls || {},
				text
			},
			loading: () => {
				if (debug) console.info('…Loading WebFonts');
				onLoading();
			},
			active: () => {
				if (debug) console.info('WebFonts are Active!');
				onActive();
			},
			inactive: () => {
				if (debug) console.warn('WebFonts Failed to Load 😱');
				onInactive();
			},
			fontloading: (familyName, fvd) => {
				if (debug) console.info(familyName + ' ' + fvd + ' is Loading');
				fontIsLoading();
			},
			fontactive: (familyName, fvd) => {
				if (debug) console.info(familyName + ' ' + fvd + ' is Active!');
				fontIsLoaded(familyName, fvd, text);
			},
			fontinactive: (familyName, fvd) => {
				if (debug) console.warn(familyName + ' ' + fvd + ' Failed to Load');
				fontLoadFailed(familyName, fvd);
			},
			classes,
			timeout: timeout
		});
	}

	render() {
		return null;
	}
}

FontLoader.propTypes = {
	fontProvider: PropTypes.oneOf([
		'google',
		'typekit',
		'fontdeck',
		'monotype',
		'custom',
	]).isRequired,
	fontFamilies: PropTypes.array.isRequired,

	text: PropTypes.string,
	typekitId: PropTypes.string,
	typekitAPI: PropTypes.string,
	fontdeckId: PropTypes.string,
	monotypeProjectId: PropTypes.string,
	monotypeVersion: PropTypes.string,
	monotypeLoadAllFonts: PropTypes.bool,
	customUrls: PropTypes.array,

	onActive: PropTypes.func,
	onInactive: PropTypes.func,
	onLoading: PropTypes.func,
	fontIsLoaded: PropTypes.func,
	fontIsLoading: PropTypes.func,
	fontLoadFailed: PropTypes.func,

	fonts: PropTypes.object,
	timeout: PropTypes.number,
	classes: PropTypes.bool,
	debug: PropTypes.bool,
};

FontLoader.defaultProps = {
	fonts: {},
	fontIsLoaded: () => {},
	fontIsLoading: () => {},
	fontLoadFailed: () => {},
	onActive: () => {},
	onInactive: () => {},
	onLoading: () => {},
	timeout: 3000,
	classes: false,
};
