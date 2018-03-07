import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import Success from '../../../component/Success';

class MobileSuccess extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
				<Header></Header>
				<Success></Success>
				<Footer></Footer>
			</div>
		)
	}
}
module.exports = MobileSuccess