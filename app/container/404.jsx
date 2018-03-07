import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class NotFound extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
				<h1>404 not found</h1>
			</div>
		)
	}
}

module.exports = NotFound

