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
		if (!(familyName + ' ' + styleToCheck in fonts) || (familyName + ' ' + styleToCheck in fonts && fonts[(familyName + ' ' + styleToCheck)].subset)) {
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
		const { fontIsLoaded, fontLoadFailed, typekitId, customUrls, timeout, text } = this.props;
		const WebFont = require('webfontloader');

		WebFont.load({
			[fontProvider]: {
				families: stylesToLoad,
				id: typekitId,
				urls: customUrls || {},
				text
			},
			fontactive: (familyName, fvd) => fontIsLoaded(familyName, fvd, text),
			fontinactive: (familyName, fvd) => fontLoadFailed(familyName, fvd),
			classes: false,
			timeout: timeout || 3000
		});
	}

	render() {
		return null;
	}
}

FontLoader.propTypes = {
	customUrls: PropTypes.array,
	fontFamilies: PropTypes.array,
	fontIsLoaded: PropTypes.func,
	fontLoadFailed: PropTypes.func,
	fontProvider: PropTypes.string,
	fonts: PropTypes.object,
	text: PropTypes.string,
	timeout: PropTypes.number,
	typekitId: PropTypes.string,
};
