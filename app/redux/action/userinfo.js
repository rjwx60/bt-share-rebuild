// 定义 action
import * as actionTypes from '../constant/userinfo';

export function login(data) {
	return {
		type: actionTypes.USERINFO_LOGIN,
		data: data
	}
}
