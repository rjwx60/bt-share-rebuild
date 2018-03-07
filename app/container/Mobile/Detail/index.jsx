import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import Detail from '../../../component/Detail';
import CommentList from './CommentList';

import { getUserDetail } from '../../../fetch/UserDetail/detail.js';


class MobileDetail extends React.Component {
	constructor (props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			time:undefined,
			title:undefined,
			key:undefined,
			description:undefined,
			comments:undefined
		}
	}
	render() {
		return (
			<div>
				<Header></Header>
				<Detail data={this.state}></Detail>
				<CommentList data={this.state}></CommentList>
			</div>
		)
	}
	componentDidMount(){
		const data = this.props.match.params.data;
		const result = getUserDetail(data);
		result.then(res => {
			return res.json()
		}).then(json => {

			const title = json.title;
			const time = json.time;
			const key = json.key;
			const description = json.description;
			const comments = json.comments;

			this.setState({
				time:time,
				title:title,
				key:key,
				description:description,
				comments:comments
			})
		})
	}
}
module.exports = MobileDetail