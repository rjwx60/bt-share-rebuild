import { post } from '../post';

export function getUserDetail(id) {
	const result = post('/api/userDetail',{id:id});
	return result;
}