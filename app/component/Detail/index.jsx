import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Detail extends React.Component {
	constructor (props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		return (
			<div>
				{
					data
					?
					<div id="title">
						<div className="container">
							<h3>{data.key}</h3>
							<p>{data.title}</p>
							<p>{data.description}</p>
							<p>{data.time}</p>
						</div>
					</div>
					:
					<div id="title">
						<div className="container">
							<h3>Title</h3>
							<p>There are details about things.</p>
						</div>
					</div>
				}
			</div>
			
		)
	}
}
export default Detail