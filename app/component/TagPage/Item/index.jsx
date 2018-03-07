import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Item extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		// React 中实现 for 循环输入 html语句
		var CreateTag = (length) => {
			var num = Math.ceil(length/12);
			var arr = [];
			if(num >=8 ){
				for(let i=1; i<num+1; i++){
					// Error: The `style` prop expects a mapping from style properties to values, not a string. 
					// For example, style={{marginRight: spacing + 'em'}} when using JSX.
					// arr.push(<li value={i} key={i} style="display:none;">{i}</li>)
					arr.push(<li value={i} key={i} style={{display:"none"}}>{i}</li>)
				}			
			}else{
				for(let i=1; i<num+1; i++){
					// 小于8个的话就单独显示 不加效果
					arr.push(<li value={i} key={i}>{i}</li>)
				}
			}
	
			return arr;
		}

		return(
			// 发现！！ e.target.value  若 value 的值非数字或没有设置 value 属性，则 value 默认为0
			<ul onClick={this.props.clickHandler}>
				{
					this.props.sta.First
					?
					<li value="-1" >First</li>
					:
					<span></span>
				}
				{
					this.props.sta.Previous
					?
					<li value="-2" >Previous</li>
					:
					<span></span>
				}
				{
					
					<ul id="tagUl">
					{CreateTag(this.props.length)}
					</ul>
					
					
				}
				{
					this.props.sta.Next
					?
					<li value="-3" >Next</li>
					:
					<span></span>
				}
				{
					this.props.sta.Last
					?
					<li value="-4" >Last</li>
					:
					<span></span>
				}
			</ul>
		)
	}

	componentDidMount(){

	}
}
export default Item