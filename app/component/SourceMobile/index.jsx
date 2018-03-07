import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link }from 'react-router-dom';

import createHistory from 'history/createHashHistory';

import Item from './Item';
// import TagPage from '../TagPage';

import './style.less';

class Source extends React.Component {
	constructor (props, context) {
		super (props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			loadingMore:false
		}
	}
	render() {
		// 资源数据 data
		var data = this.props.state.data;
		
		

		return (
			<div id="SourceList" ref="wrapper">
				<div className="container">
					<h3>Public Keys</h3>
					<ul id="list-header">
						<li className="Grid-cell Text-align tit">Title</li>
						<li className="Grid-cell Text-align ke">Keys</li>
					</ul>

					<div id="list-body">
						{
							this.props.data.map((item,index) => {
								return <Item 
											data={item} 
											key={index} 
											handleClick={this.handleClick}>
										</Item>
							})
						}	
					</div>
				</div>
			</div>
		)
	}

	componentDidMount(){
		// 加载的页数
		var page = parseInt(this.props.state.page);
		// 获取资源的函数
		const getSource = this.props.getSourceList;
		// 总的资源的数目 length
		const length = this.props.state.length;
		// 滚动时自动加载更多
		const wrapper = this.refs.wrapper;
		// console.log(wrapper)
		let timeoutId;

		var this_ = this;

		function callback(){

			const top = wrapper.getBoundingClientRect().top;
			const bottom = wrapper.getBoundingClientRect().bottom;
			const windowHeight = window.screen.height;

			if(bottom && bottom < 658){
				// console.log("top",top)
				// console.log("bottom",bottom)

				page = page + 1;
				// console.log("page",page);
				this_.setState({loadingMore:true});
				getSource({pageNumber:page});
				this_.setState({loadingMore:false});

			}
		}
		window.addEventListener('scroll',function(){

			if(this_.state.loadingMore){
				return;
			}
			if(timeoutId){
				clearTimeout(timeoutId)
			}
			// 函数节流
			timeoutId = setTimeout(callback,1500) 

		}.bind(this),false);
	}
	handleClick(data){
		const history = createHistory();
		// 旧形式
		// let dataString = data.title+ '--' + data.description + '--' + data.key + '--' + data.time;

		// 新形式
		let dataString = data.id;

		history.push(`/detail/${dataString}`);
	}
}
export default Source


/*
	<li className="Grid-cell mess Text-align">Description</li>
	<li className="Grid-cell mess Text-align">Shared</li>
	<li className="Grid-cell mess Text-align">Replay</li>
*/