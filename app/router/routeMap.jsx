import React from 'react';
import { 
    HashRouter as Router, 
    Route, 
    Switch } from 'react-router-dom';

import MediaQuery from 'react-responsive';

import App from '../container';
import NotFound from '../container/404';

import PCHome from '../container/PC/Home';
import PCDetail from '../container/PC/Detail';
import PCLogin from '../container/PC/Login';
import PCSign from '../container/PC/Sign';
import PCShare from '../container/PC/Share';
import PCSuccess from '../container/PC/Success';
import PCReplay from '../container/PC/Replay';


import MobileHome from '../container/Mobile/Home';
import MobileDetail from '../container/Mobile/Detail';
import MobileLogin from '../container/Mobile/Login';
import MobileSign from '../container/Mobile/Sign';
import MobileShare from '../container/Mobile/Share';
import MobileSuccess from '../container/Mobile/Success';
import MobileReplay from '../container/Mobile/Replay';

// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <div>
                    <MediaQuery minDeviceWidth={1224}>
                        <Switch>
                            <Route exact path='/' component={App}/> 
                            <Route exact path='/home/:page' component={PCHome}/> 
                            <Route exact path='/home' component={PCHome}/> 
                            <Route path='/detail/:data' component={PCDetail}/>
                            <Route path='/detail' component={PCDetail}/>
                            <Route path='/login' component={PCLogin}/>
                            <Route path='/sign' component={PCSign}/>
                            <Route path='/share' component={PCShare}/>
                            <Route path='/success' component={PCSuccess}/>
                            <Route path='/replay/:data' component={PCReplay}/>
                            <Route path='/replay' component={PCReplay}/>
                            <Route path='*' component={NotFound}/>              
                        </Switch>
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={1224}>
                        <Switch>
                            <Route exact path='/' component={App}/> 
                            <Route path='/home/:page' component={MobileHome}/>
                            <Route path='/home' component={MobileHome}/>
                            <Route path='/detail/:data' component={MobileDetail}/>
                            <Route path='/detail' component={MobileDetail}/>
                            <Route path='/login' component={MobileLogin}/>
                            <Route path='/sign' component={MobileSign}/>
                            <Route path='/share' component={MobileShare}/>
                            <Route path='/success' component={MobileSuccess}/>
                            <Route path='/replay/:data' component={MobileReplay}/>
                            <Route path='/replay' component={MobileReplay}/>
                            <Route path='*' component={NotFound}/>               
                        </Switch>
                    </MediaQuery>
                </div>
            </Router>
        )
    }
}

export default RouterMap


