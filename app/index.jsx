import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { hashHistory } from 'react-router-dom';
import configureStore from './redux/store/configureStore';

import './static/css/reset.less';
// 过程中遇到的问题，即便去掉了模版html中的link和script和删掉了bootstrap的组件
// 但这句话没有删，导致出现奇怪的样式，差点还打击到自己的信心
// 明明已经删掉了能引用的组件却没有报错还能正常运作，估计是跟webpack的工作机制有关，
// import './static/bootstrap/css/bootstrap.min.css';


// 创建 Redux 的 store 对象
const store = configureStore()

import RouteMap from './router/routeMap';

// 测试 fetch 的功能
// import { getData, postData } from './test/test-fetch'
// import { getData, postData } from './test/test-fetch-update'
// getData();
// postData();


render(
    <Provider store={store}>
       	<RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
