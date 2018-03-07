import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SharePage from '../../../../component/SharePage';

import createHistory from 'history/createHashHistory';
import { postSource } from '../../../../fetch/AddSource/addSource';


class Share extends React.Component{
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return (
			<div>
				<SharePage submitFn={this.submitFn.bind(this)}></SharePage>
			</div>
		)
	}
	submitFn(obj){
		const result = postSource(obj);
		result.then(res => {
			return res.json()
		}).then(json => {
			if(json.errno === 0){
				console.log("ok")
			}
		})
		const history = createHistory();
		history.push('/home');
	}
}
export default Share