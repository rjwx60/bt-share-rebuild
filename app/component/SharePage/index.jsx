import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import createHistory from 'history/createHashHistory';

import './style.less';

class SharePage extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			title:'',
			key:'',
			description:''
		}
	}
	render(){
		return(
			<div id="Share">
				<div className="container">
					<h1>Share</h1>
					<form>
						<div>
							<label htmlFor="key">Key</label>
							<input 
								type="text" 
								id="key" 
								placeholder="Key" 
								onChange={this.changeHandler2key.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}								
								value={this.state.key}
							/>
						</div>
						<div>
							<label htmlFor="Title">Title</label>
							<input 
								type="text" 
								id="Title" 
								placeholder="Title" 
								onChange={this.changeHandler2title.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.title}
							/>
						</div>
						<div>
							<label htmlFor="description">Description</label>
							<textarea 
								id="description" 
								placeholder="Description" 
								maxLength="10"
								onChange={this.changeHandler2description.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.description}
							></textarea>
						</div>
						<div>
							<label></label>
							<input
								type="button"
								value="Share"
								onClick={this.submitFn.bind(this)}
							/>
						</div>
					</form>
					<p>BitTorrent Keys Share</p>
				</div>
			</div>
		)
	}
	// 下面能否用一个函数处理？
	// 密码！密码要处理！加密！
	// 下面两个函数功能高度相似，能否合并？ 
	// 下面的代码在多处都使用到，能否整合？
	changeHandler2key(e){
		this.setState({key:e.target.value})
	}
	changeHandler2title(e){
		this.setState({title:e.target.value})
	}
	changeHandler2description(e){
		this.setState({description:e.target.value})
	}

	keyUpHandler(e){
		const key = this.state.key;
		const title = this.state.title;
		const description = this.state.description;

		let timer = new Date();
		let time = timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes();
		// console.log(time)
		// const history = createHistory();

		if(e.keyCode === 13 && key.trim() && title.trim() && description.trim()){
			this.setState({
				key:'',
				title:'',
				description:''
			});
			this.props.submitFn({time:time,key:key,title:title,description:description});

		}
	}
	submitFn(){
		const key = this.state.key;
		const title = this.state.title;
		const description = this.state.description;
		let timer = new Date();
		let time = timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes();
		
		this.props.submitFn({time:time,key:key,title:title,description:description})
	}
}

export default SharePage