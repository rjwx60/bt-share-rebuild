import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userinfoActions from '../redux/action/userinfo';

import RouterMap from './../router/routeMap';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div> 
                <p>header</p>
                <p>footer</p>
            </div>
        )
    }
    componentDidMount(){
        // 模拟登陆
        this.props.userinfoActions.login({
            userid: '1',
            name: 'John'
        })
    }
}

function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}
// module.exports = App
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)



/*  

import A from '../test/test-reduxA';
import B from '../test/test-reduxB';
import C from '../test/test-reduxC';

    <p>HelloWorld,there is First Page-App</p>
    <A userinfo={this.props.userinfo}/>
    <B userinfo={this.props.userinfo}/>
    <C actions={this.props.userinfoActions}/>
*/