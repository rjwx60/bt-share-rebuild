import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link }from 'react-router-dom';

class Item extends React.Component {
	constructor (props, context) {
		super (props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		const data = this.props.data;
		// const key = this.props.key;
		return (
				<ul>
					<li className="Grid-cell Flex-Justify-center Text-align tit" onClick={this.props.handleClick.bind(this,data)}><span>{data.title}</span></li>
					<li className="Grid-cell Flex-Justify-center ke" onClick={this.props.handleClick.bind(this,data)}><span>{data.key}</span></li>
				</ul>			
		)
	}

}
export default Item

// 方式有二：
// <li className="Grid-cell u-3of25 Flex-Justify-center special" onClick={this.props.showDetail.bind(this,data)}>ShowMore</li>
// <Link to={`/detail/${data.title}`} className="Grid-cell u-3of25"><li className="Flex-Justify-center special">ShowMore</li></Link>

// 不管哪种方式，不管是history.push(url)还是<Link to=url>都能从目标跳转组件中通过 this.props.match.params.xxx 获取到传递参数 (xxx在 routerMap 中定义)
// 如果获取不到，问题出现一般在你在子组件尝试的获取，或参数指令使用不当如 .push(`/detail/${data.title}`), to={`/detail/${data.title}`}，this.props.match.params.data 或..



/*
	<li className="Grid-cell mess Flex-Justify-center" onClick={this.props.showDetail.bind(this,data)}>ShowMore</li>
	<li className="Grid-cell mess Flex-Justify-center">{data.time}</li>
	<li className="Grid-cell mess Flex-Justify-center" onClick={this.props.goReplay.bind(this)}>Replay</li>
*/






