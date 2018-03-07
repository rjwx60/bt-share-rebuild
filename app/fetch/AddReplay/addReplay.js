import { post } from '../post';

export function addReplay(obj){
	const result = post('/api/addReplays',{
		id:obj.id,
		username:obj.username,
		text: obj.text,
		postTime:obj.postTime,
		agreeNumber:obj.agreeNumber,
		disagreeNumber:obj.disagreeNumber
	});
	return result;
}