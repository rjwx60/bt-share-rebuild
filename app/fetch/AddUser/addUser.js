import { post } from '../post';

export function postUser(obj){
	const result = post('/api/addUser',{
		username: obj.username,
		email: obj.email,
		password: obj.password
	});
	return result; 
}