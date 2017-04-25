var React = require('react');
var ReactDOM = require('react-dom');
var FontLoader = require('react-font-loader');

var App = React.createClass({
	render () {
		return (
			<div>
				<FontLoader />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
