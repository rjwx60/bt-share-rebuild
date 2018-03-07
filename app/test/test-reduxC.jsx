import React from 'react';

class C extends React.Component{
	render(){
		return (
			<div>
				<button onClick={this.changeUserInfo.bind(this)}>change</button>
			</div>
		) 
	}
	changeUserInfo() {
		const actions = this.props.actions;
		actions.login({
			userid:'2',
			name:'Smith'
		})
	}
}
export default C