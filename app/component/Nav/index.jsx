import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router-dom';

import './style.less';

class Nav extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
			<div id="nav">
				<div className="container">
					<h2>Hello World</h2>
					<p>This is a public directory of BitTorrent Sync keys.</p>
					<p>Register now and share your own keys and datas whit the world.</p>
					<ul>
						<Link to="/share"><li>Share now!</li></Link>
						<Link to="/sign"><li>Sign up now!</li></Link>
					</ul>
				</div>
			</div>
		)
	}
}

export default Nav