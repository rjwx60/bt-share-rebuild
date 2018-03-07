import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userinfoActions from '../../../redux/action/userinfo';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import Replay from './Replay';

class MobileReplay extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div>
				<Header></Header>
				<Replay userinfo={this.props.userinfo}></Replay>
				<Footer></Footer>
			</div>
		)
	}
	componentDidMount(){
		// 可以通过 this.props 与 state 和 action 互动
		// console.log(this.props.userinfo)
	}
}
// module.exports = Replay
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
)(MobileReplay)