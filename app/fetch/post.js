import 'whatwg-fetch';
import 'es6-promise';

/*

	传过来的是json格式
	{
        a: 100,
        b: 200
    }
    下面的函数将其变成
    a=100&b=200的格式
    即key1=value1&key2=value2&key3=value3
	
	注意下面的函数有缺陷，首先就是没有判定数据的可靠有效性
*/

function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}

// 发送 post 请求
export function post(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });

    return result;
}
