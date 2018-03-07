import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Comment from '../../../../component/Comment';

class CommentList extends React.Component{
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const data = this.props.data;
		return (
			<div>
			{
				data.comments
				?
				<Comment data={data.comments}></Comment>
				:
				<div style={{'textAlign':'center','fontWeight':'bold'}}>There ara no comments.</div>
			}
			</div>
		)
	}
}
export default CommentList