import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import Nav from '../../../component/Nav';
import SourceList from './SourceList';

class PCHome extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		// URL 参数 即通过 this.props.match.params 获取的参数需在父级组件才能获取，否则在子组件尝试获取时 会报 undefined params.. 之类的错
		return (
			<div>
				<Header></Header>
				<Nav></Nav>
				<SourceList page={this.props.match.params}></SourceList>
				<Footer></Footer>
			</div>
		)
	}
	componentDidMount(){}
}
module.exports = PCHome