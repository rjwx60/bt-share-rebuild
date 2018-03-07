import * as actionTypes from '../constant/userinfo';

const initialState = {};

// 定义规则
export default function userinfo(state = initialState, action){
	switch (action.type) {
		// 登陆
		case actionTypes.USERINFO_LOGIN:
			return action.data

		default:
			return state
	}
}