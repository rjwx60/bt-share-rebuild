import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';

import SourceList from './SourceList';

class MobileHome extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
				<Header></Header>
				<SourceList></SourceList>
			</div>
		)
	}
}
module.exports = MobileHome