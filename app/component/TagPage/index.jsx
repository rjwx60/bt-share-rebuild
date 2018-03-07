import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import createHistory from 'history/createHashHistory';

import Item from './Item';

import './style.less';

var tagNumber = 12;

class TagPage extends React.Component{
	constructor(props, context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			First: false,
			Previous: false,
			Next: false,
			Last: false
		}
	}
	render () {
		return (
			<div id="Tag">
				<div className="container">
					<Item 
						clickHandler={this.clickHandler.bind(this)} 
						sta={this.state} 
						length={this.props.length}
					></Item>
				</div>
			</div>
		)
	}
	componentDidMount(){
		// 初始化时的 Next 和 Last 显现
		if(Math.ceil(this.props.length/tagNumber) >= 8){
			this.setState({
				Next: true,
				Last: true
			})

			// 初始化时 1 2 3 的显现
			// 这种写法好低级和恶心！
			var oUl = document.getElementById("tagUl");
			oUl.firstElementChild.style = "display:block";
			oUl.firstElementChild.nextElementSibling.style = "display:block";
			oUl.firstElementChild.nextElementSibling.nextElementSibling.style = "display:block";
		}
		// 通过 URL 传值跳转
		this.clickHandler();
	}

	// 处理传递过来的参数
	clickHandler(e){
		// 如果没有 .bind.(this) 便会获取不到 this.props.xxx，即 undefined
		const length = this.props.length;
		const getSource = this.props.getSource;

		var oUl = document.getElementById("tagUl");
		var value, eTarget;

		if(!e){
			value = this.props.page.page || 1;
			eTarget = oUl.children[value-1];
		}else{
			e.bubbles = true;
			value = e.target.value;
			eTarget = e.target;
		}
		

		

		// console.log(length)
		// console.log(e.eventPhase)
		// console.log(e.target.value); // 0
		// console.log(e.target.nodeName.toLowerCase()); // li
		// console.log(this.props.match.params.page);
		// console.log(this.props.page);

		// console.log(e.target.parentNode);  // <ul>....</ul>
		// console.log(e.target.nextElementSibling); // <li>....</li>
		// console.log(e.target.nextElementSibling.nextElementSibling); // <li>....</li>
		// console.log(e.target.previousElementSibling)
		// console.log(e.target.previousElementSibling.previousElementSibling)
		

		if(Math.ceil(this.props.length/tagNumber) >= 8){
			//  特殊 Tag 的跳转
			var nowpage = parseInt(this.props.page.page);
			// console.log(nowpage);
			// console.log(value)
			switch (value){
				case -1:{
					// console.log("First");
					value = 1;
					eTarget = oUl.firstElementChild;
					// console.log(eTarget);
					break;
				}
					
				case -4:{
					// console.log("Last");
					value = Math.ceil(length/tagNumber);
					eTarget = oUl.lastElementChild;
					// console.log(eTarget);
					break;
				}
					
				case -2:{
					// console.log("Previous")
					value = (nowpage - 1);
					eTarget = oUl.children[value-1];
					break;
				}
					
				case -3:{
					// console.log("Next")
					value = (nowpage + 1);
					eTarget = oUl.children[value-1];
					break;
				}
					
				default:
					break;
			}

			// console.log("value",value)

			// EDif 距离最后一个数的 距离 11
			var EDif = (Math.ceil(length/tagNumber)-value);
			// SDif 距离第一个数的 距离
			var SDif = value-0;

			// Next Last 效果的实现
			if(EDif >=3 ){
				this.setState({
					Next: true,
					Last: true
				})
			}else if(EDif != 0 && EDif <= 2){
				this.setState({
					Next: true,
					Last: false
				})
			}else{
				console.log("Else")
				this.setState({
					Next: false,
					Last: false
				})
			}

			// Previous First 效果的实现
			if(SDif >3 ){
				this.setState({
					Previous: true,
					First: true
				})
			}else if(SDif != 1 && SDif <= 3 ){
				this.setState({
					Previous: true,
					First: false
				})
			}else{
				this.setState({
					Previous: false,
					First: false
				})
			}
			// console.log('EDif: '+ EDif);
			// console.log('SDif: '+ SDif);
			// console.log('value: ' + e.target.value)
			// console.log(this.state)	


			// 控制 li 的显示	
			if( SDif == 1){
				// 贼恶心！！
				for(let i=0; i<oUl.children.length;i++){
					oUl.children[i].style = "display:none;background-color:white;color:black;";
				}
				eTarget.style = "display:block;background-color:red;color:white;";
				eTarget.nextElementSibling.style = "display:block";
				eTarget.nextElementSibling.nextElementSibling.style = "display:block";
			}
			if( SDif == 2){
				// 贼恶心！！
				for(let i=0; i<oUl.children.length;i++){
					oUl.children[i].style = "display:none;background-color:white;color:black;";
				}
				eTarget.previousElementSibling.style = "display:block";
				eTarget.style = "display:block;background-color:red;color:white;";
				eTarget.nextElementSibling.style = "display:block";
				eTarget.nextElementSibling.nextElementSibling.style = "display:block";
			}
			if( SDif >=3 && EDif >=2){
				// 贼恶心！！
				for(let i=0; i<oUl.children.length;i++){
					oUl.children[i].style = "display:none;background-color:white;color:black;";
				}

				eTarget.previousElementSibling.previousElementSibling.style = "display:block";
				eTarget.previousElementSibling.style = "display:block";
				eTarget.style = "display:block;background-color:red;color:white;";
				eTarget.nextElementSibling.style = "display:block";
				eTarget.nextElementSibling.nextElementSibling.style = "display:block";
			}

			if( EDif == 1){
				// 贼恶心！！
				for(let i=0; i<oUl.children.length;i++){
					oUl.children[i].style = "display:none;background-color:white;color:black;";
				}
				eTarget.previousElementSibling.previousElementSibling.style = "display:block";
				eTarget.previousElementSibling.style = "display:block";
				eTarget.style = "display:block;background-color:red;color:white;";
				eTarget.nextElementSibling.style = "display:block";
			}
			if( EDif == 0){
				// 贼恶心！！
				for(let i=0; i<oUl.children.length;i++){
					oUl.children[i].style = "display:none;background-color:white;color:black;";
				}
				eTarget.previousElementSibling.previousElementSibling.style = "display:block";
				eTarget.previousElementSibling.style = "display:block";
				eTarget.style = "display:block;background-color:red;color:white;";
			}

	

		}


		const history = createHistory();
		history.push(`/home/${value}`);

		this.props.getSource({pageNumber: value})
		
	}
}
export default TagPage