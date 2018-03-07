import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Footer extends React.Component {
	constructor (props,context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div id="footer">
				CopyRights.rjw.2017
			</div>
		)
	}
}
export default Footer