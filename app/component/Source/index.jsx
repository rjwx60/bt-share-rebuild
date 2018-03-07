import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link }from 'react-router-dom';

import createHistory from 'history/createHashHistory';

import Item from './Item';
import TagPage from '../TagPage';

import './style.less';

class Source extends React.Component {
	constructor (props, context) {
		super (props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		// 资源数据 data
		const data = this.props.data;
		// 总的资源的数目 length
		const length = this.props.length;
		// 获取资源的函数
		const getSource = this.props.getSourceList;

		return (
			<div id="SourceList">
				<div className="container">
					<h3>Public Keys</h3>
					<ul id="list-header">
						<li className="Grid-cell tit">Title</li>
						<li className="Grid-cell ke">Keys</li>
						<li className="Grid-cell mess Text-align">Description</li>
						<li className="Grid-cell mess Text-align">Shared</li>
						<li className="Grid-cell mess Text-align">Replay</li>
					</ul>
					<div id="list-body">
						{
							this.props.data.map((item,index) => {
								return <Item 
											data={item} 
											key={index} 
											showDetail={this.showDetail} 
											goReplay={this.goReplay}>
										</Item>
							})
						}	
					</div>
					<TagPage 
							page={this.props.page}
							length={length} 
							getSource={getSource}>
					</TagPage>
					<p>BitTorrent Keys Share</p>
				</div>
			</div>
		)
	}
	componentDidMount(){}
	// bind(this)放的位置要适当，否则是会有很多问题的，原先bind(this)是绑定在showDetail函数的，结果有问题，
	// 后来绑定在 木偶组件 才没事，才完美显示，
	// 生成木偶组件的时候已经传入了挑战函数和获取点击组件的那个特定data的函数，点击的那一瞬间，触发木偶的onclick事件，将特定data传到上层,也就是这里，智能组件
	// 然后如何将data 传给 detail组件呢？
	showDetail(data){
		/*
			原本是只有history.push的，可是会报不能跳转的错，于是增加backRouter
			console.log(data);
			const backRouter = this.props.backRouter;
			if(backRouter){
				const history = createHistory();
				history.push('/detail');
			}else{
				window.history.back();
			}
		*/
		// 我勒个去，后来又可以了，怀疑是bind(this)的位置不对导致的一系列错误……
		const history = createHistory();

		// 旧形式
		// let dataString = data.title+ '--' + data.description + '--' + data.key + '--' + data.time;
		
		// 新形式
		let dataString = data.id;
		
		history.push(`/detail/${dataString}`);
		// history.push('/detail/'+data);	
	}
	goReplay(data){
		const history = createHistory();
		let dataString = data.id;
		history.push(`/replay/${dataString}`);
	}
}
export default Source