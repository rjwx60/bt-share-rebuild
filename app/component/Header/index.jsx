import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userinfoActions from '../../redux/action/userinfo';

 
import './style.less';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
    	const username = this.props.userinfo.username;
        return (
			<div id="header">
				<div className="container">
					<Link to='/home'><h1>BitKeys Share</h1></Link>
					{
						username
						?
						<ul>
							<Link to="/sign"><li>{username}</li></Link>
							<li onClick={this.SignOut.bind(this)}>Sign out</li>
						</ul>
						:
						<ul>
							<Link to="/sign"><li>Sign up</li></Link>
							<Link to="/login"><li>Sign in</li></Link>
						</ul>
					}
				</div>
			</div>
        )
    }
    componentDidMount(){
		// 可以通过 this.props 与 state 和 action 互动
    	// console.log("Username: " + this.props.userinfo.username);
    }
    SignOut(){
    	this.props.userinfoActions.login({
    		username:''
    	})
    }
}

// export default Header
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
)(Header)