import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'

class ReplayPage extends React.Component{
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			replay: ''
		}
	}
	render() {
		return (
			<div id="Replay">
				<div className="container">
					<h1>Replay</h1>
					<form>
						<div>
							<label htmlFor="replay">Replay</label>
							<textarea 
								id="replay" 
								placeholder="please input your word!" 
								maxLength="100"
								onChange={this.changeHandler2replay.bind(this)}
								onKeyUp={this.keyUpHandler.bind(this)}
								value={this.state.replay}
							></textarea>
						</div>
						<div>
							<label></label>
							<input
								type="button"
								value="Replay"
								onClick={this.submitFn.bind(this)}
							/>
						</div>
					</form>
					<p>BitTorrent Keys Share</p>
				</div>
			</div>
		)
	}
	changeHandler2replay(e){
		this.setState({replay:e.target.value})
	}
	keyUpHandler(e){
		const replay = this.state.replay;
		const Username = this.props.userinfo.username;

		if(Username && e.keyCode === 13 && replay.trim()){
			this.setState({
				replay:''
			});
			this.props.submitFn({replay:replay});
		}

	}
	submitFn(){
		const replay = this.state.replay;
		const Username = this.props.userinfo.username;

		if( Username && replay.trim()){
			this.setState({
				replay:''
			});
			this.props.submitFn({replay:replay});
		}else{
			console.log("Please Sign in first!!!!!");
		}
	}

}
export default ReplayPage