import { get } from '../get';
import { post } from '../post';

// 旧版 get 资源列表
export function getSourceList(){
	const result = get('/api/sourcelist');
	return result;
}

// 新版 get 资源列表
export function getSourceListUpdate(obj){
	// 
	if(!obj.pageNumber){
		const result = post('/api/sourceListUpdata',{
			pageNumber: 1,
		});
		return result; 
	}else{
		const result = post('/api/sourceListUpdata',{
			pageNumber: obj.pageNumber,
		});
		return result; 
	}
}