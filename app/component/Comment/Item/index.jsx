import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Item extends React.Component {
	constructor(props, context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		// const key = this.props.key;
		return (
			<div className="comment">
				<p>
					<span>{data.username}</span>
					<span>{data.postTime}</span>
				</p>
				<p>{data.text}</p>
			</div>
		)
	}
}
export default Item