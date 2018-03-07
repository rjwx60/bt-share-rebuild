import { combineReducers } from 'redux';

import userinfo from './userinfo';

// 封装定义好的规则
const rootReducer = combineReducers({
	userinfo:userinfo
})

export default rootReducer