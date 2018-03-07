import { post } from '../post';

export function checkUser(obj){
	const result = post('/api/checkUser',{
		username: obj.username,
		password: obj.password
	});
	return result;
}