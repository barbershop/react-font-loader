var React = require('react');
var ReactDOM = require('react-dom');
var FontLoader = require('react-font-loader');

var App = React.createClass({
	render () {
		return (
			<div>
				<FontLoader
					fontProvider="google"
					fontFamilies={['Source Code Pro:400']}
					onActive={() => {
						document.body.classList.add('webfonts-loaded');
					}}
					debug
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
