import React from 'react';

class B extends React.Component{
	render(){
		return (
			<p>{this.props.userinfo.name}</p>
		) 
	}
}
export default B