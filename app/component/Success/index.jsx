import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Success extends React.Component {
	constructor (props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div id="Success">
				<div className="container">
					<h2>Registration Success!</h2>
					<p>This page will be change in 3s</p>
				</div>
			</div>
		)
	}
}
export default Success