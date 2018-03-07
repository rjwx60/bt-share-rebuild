import 'whatwg-fetch';
import 'es6-promise';

export function get(url) {
	var  result = fetch(url,{
		// credentials 证书
		credentials: 'include',
		headers: {
			'Accept' : 'application/json, text/plain, */*',
			//'Content-Type': 'application/x-wwww-form-urlencoded'
		}
	});

	return result;
}