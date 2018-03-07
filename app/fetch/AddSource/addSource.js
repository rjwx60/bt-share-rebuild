import { post } from '../post';

export function postSource(obj){
	const result = post('/api/addSource',{
		time: obj.time,
		title: obj.title,
		key: obj.key,
		description: obj.description
	});
	return result;
}