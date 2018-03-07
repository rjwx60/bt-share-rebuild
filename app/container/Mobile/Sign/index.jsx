import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userinfoActions from '../../../redux/action/userinfo';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import Sign from './Sign';

class MobileSign extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
				<Header></Header>
				<Sign actions={this.props.userinfoActions}></Sign>
				<Footer></Footer>
			</div>
		)
	}
	componentDidMount(){
	}
}
// module.exports = MobileSign
function mapStateToProps(state) {
	return {
		userinfo: state.userinfo
	}
}
function mapDispatchToProps(dispatch) {
	return {
		userinfoActions: bindActionCreators(userinfoActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MobileSign)