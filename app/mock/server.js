// 此处是项目前期的后端管理，用的是 nodejs 的文件管理模块
// 新的后端管理改由 mongoose 操作 mongodb 在 backend 文件夹下，可选择其中之一运行

// 如 npm run mock 运行 前期的后端模块
// 而 npm run backend 运行 后期的模块

var Koa = require('koa');
var Router = require('koa-router');
var KoaBody = require('koa-body');

// 引入文件路径 引入 nodejs 的系统路径模块 path，引入 文件处理模块 fs
var fs = require('fs');
var path = require('path');

var app = new Koa();
var router = new Router();


// 下面依次是 Bt资源列表(数据库) 评论列表(数据库) 用户列表
var sourceListData = require('./data/sourceList.js');
var commentListData = require('./data/commentList.js');
var userListData = require('./data/userList.js');






// 主页资源加载列表（旧版：一次性获取全部资源列表，如果列表太大会造成服务器压力）
router.get('/api/sourceList', (ctx,next) => {
	ctx.body = sourceListData;
})






// 主页资源加载列表（新版：默认返回前x条列表，如果有传递过来的参数则根据参数返回相应部分的资源列表）
// 引入 KoaBody() 便可以获取用户端返回的内容信息
router.post('/api/sourceListUpdata',KoaBody(),(ctx,next) => {
	// 返回数组长度，每个页面只显示10个数据，这样客户端可以根据数组的长度控制显示Tag的样式
	var sourceListDataLength = sourceListData.data.length;

	// console.log(ctx.request.body)  
	// { pageNumber: '1' }

	var pageNumber = 1;
	if(ctx.request.body.pageNumber){
		pageNumber = parseInt(ctx.request.body.pageNumber);
	}
	//有问题：什么时候去检验是否足够长，即客户端检验长度亦或者是这里服务器端检验长度是否合适能返回对应的内容
	var start = 12 * ( pageNumber - 1 );
	var end   = 12 * ( pageNumber );
	var chooseSourceListData = sourceListData.data.slice(start,end);

	// 返回信息：
	ctx.body = {
		data: chooseSourceListData,
		allDataLength: sourceListDataLength
	}
})








// 用户详情列表获取
router.post('/api/userDetail',KoaBody(), async(ctx,next) => {
	console.log("checking UserDetail Data...");
	var time,
		title,
		key,
		description,
		targetComments;

	// console.log(ctx.request.body)  
	// { id: '0' }

	function userDetail(){
		var searchId = ctx.request.body.id;
		return new Promise((resolve) => {
			sourceListData.data.map((item,index) => {
				if(item.id == searchId){

					time = item.time;
					title = item.title;
					key = item.key;
					description = item.description;

					if(item.comments.length != 0){
						targetComments = item.comments;
						resolve();
					}else{
						targetComments = null;
						resolve();
					}
				}
			});
		})
	}

	await userDetail().then(() => {
		ctx.body = {
			time:time,
			title:title,
			key:key,
			description:description,
			comments:targetComments
		}
	})

	console.log("checking UserDetail Data Complete!");
})



// 评论的增加
router.post('/api/addReplays',KoaBody(),async(ctx,next) => {

	console.log("adding Replays...");
	console.log(ctx.request.body)
	/*
		{ id: '0',
		  username: '123',
		  text: 'ssssss',
		  postTime: '2018-2-5 13:25',
		  agreeNumber: '0',
		  disagreeNumber: '0' }
	*/

	var request = ctx.request.body;
	var id = parseInt(request.id);

	var objData = new Object({
		username: request.username,
		text: request.text,
		postTime: request.postTime,
		agreeNumber: request.agreeNumber,
		disagreeNumber: request.disagreeNumber
	});

	var newSourceListData;

	function addReplaysStep1(){
		return new Promise((resolve) => {
			sourceListData.data.map((item,index) =>{
				if(item.id == id){
					item.comments.unshift(objData)
				}
			})
			newSourceListData = sourceListData;

			// 因找不到 从特定位置 增加内容，便全部取得后 把内容加进去 再重写覆盖 效率极低 性能极差
			fs.writeFile(path.join(__dirname, Source),"module.exports=",(err)=>{
				if(err){
					console.log('Replays增加失败1.')
					throw err;
				}else{
					resolve()
				}
			})
		})
	}

	function addReplaysStep2(){
		fs.appendFile(path.join(__dirname, Source),JSON.stringify(newSourceListData),(err)=>{
			if(err){
				console.log('Replays增加失败2.')
				throw err;
			}
		})
	}

	await addReplaysStep1().then(()=>{
		addReplaysStep2()
	}).then(() => {
		ctx.body = {
			msg:"add Replays Complete."
		}
	})
	console.log("add Replays Complete!")
})





// Bt资源列表增加
router.post('/api/addSource',KoaBody(),async(ctx,next) => {
	// 加上 KoaBody() 便能通过 ctx.request.body 获取客户端传过来的数据了 ,如果不加，则获取不到，为undefined
	console.log('new Source shared..');

	// console.log(ctx.request.body);
	/*
	{ 
	  time: '1111-1111-1111',
	  title: '22',
	  key: '11',
	  description: '3333' 
	}
	*/

	var request = ctx.request.body;
	var id = sourceListData.data.length;

	console.log(request);

	var objData = new Object({
		id:id,
		time: request.time,
		title: request.title,
		key: request.key,
		description: request.description,
		comments: []
	});

	function addSourceStep1(){
		return new Promise((resolve) => {
			sourceListData.data.push(objData);
			// 如果没有 path 便会找不到文件 所以要引入 nodejs 的 path 模块
			// 如果没有 JSON.stringify 预处理写入的数据 sourceListData 写入后的数据将只有[Object Object]
			fs.writeFile(path.join(__dirname, Source),"module.exports=",(err)=>{
				if(err){
					console.log('资源分享过程报错1')
					throw err;
				}else{
					resolve()
				}
			})
		})
	}

	function addSourceStep2(){
		fs.appendFile(path.join(__dirname, Source),JSON.stringify(sourceListData),(err)=>{
			if(err){
				console.log('资源分享过程报错2')
				throw err;
			}
		})
	}
	
	await addSourceStep1().then(() => {
		addSourceStep2()
	}).then(() => {
		// 返回客户端信息
	    ctx.body = {
	        errno: 0,
	        msg: 'shareSource ok'
	    }
	    console.log('new Source shared Complete!');
	})
})








// 用户注册的登记存储
// 这里还要加一个验证过程，即判断是否有重名的用户名，如果有重名，则返回别的信息，并提示重名
router.post('/api/addUser',KoaBody(),async(ctx, next) => {
	console.log('new User Sign up...');

	// console.log(ctx.request.body)
	// { username: '123', email: '133', password: '123' }

	function addUserStep1(){
		return new Promise((resolve) => {
			userListData.push(ctx.request.body);

			fs.writeFile(path.join(__dirname,User),"module.exports=",(err) => {
				if(err){
					console.log('注册过程报错1')
					throw err;
				}else{
					resolve()
				}
			})
		})
	}

	function addUserStep2(){
		fs.appendFile(path.join(__dirname,User),JSON.stringify(userListData),(err) => {
			if(err){
				console.log('注册过程报错2')
				throw err;
			}
		})
	}

	await addUserStep1().then(() => {
		addUserStep2()
	}).then(() => {
		// 返回客户端信息
		ctx.body = {
			errno: 0,
			msg: 'addUser ok'
		}
		console.log("Sign up Complete!")
	})

})






// 验证登录，这里最好用算法，实现，本来想到用nodejs的queryString模块的方法，但它的方法跟url模块搭配使用
// 也就是专门处理url的，所以，……这里最好用算法去实现的，毕竟是数据库的检索，也最好单独分离出来独立专门处理信息的检索
// 但我能力有限，目前只能用JS的字符串等方法或正则的方法去匹配
// 这段摘自官方文档 “querystring 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串”
router.post('/api/checkUser',KoaBody(), async(ctx,next) => {

	console.log('Checking dataBase...');

	// console.log(ctx.request.body);        
	// { username: '111', password: '222' }

	// console.log(typeof ctx.request.body)  // object
	// console.log(JSON.stringify(userListData));
	/*	
		[{"username":"ZYS","email":"ZYS666@gmail.com","password":"123456"},{"username":"RJW","email":"ZYS666@gmail.com","password":"123456"},{"username":"ZH","email":"ZH666@gmail.com","password":"123456"},{"username":"ZYF","email":"ZYFS666@gmail.com","password":"123456"},{"username":"ZZP","email":"ZZPS666@gmail.com","password":"123456"},{"username":"LHM","email":"LHM666@gmail.com","password":"123456"},{"username":"LLZ","email":"LLZ666@gmail.com","password":"123456"},{"username":"LYT","email":"LYT666@gmail.com","password":"123456"},{"username":"TZQ","email":"TZQ666@gmail.com","password":"123456"}]
	*/

	const requestObject = ctx.request.body;
	var errno = -1;

	function checkUser(){
		console.log("checking...")
		return new Promise((resolve) => {
			for(let i=0; i<userListData.length; i++){
				// console.log(userListData[i]) // 逐个打出
				let localObject = userListData[i];
				if(localObject.username == requestObject.username.trim()){
					if(localObject.password == requestObject.password.trim()){
						console.log('检索成功！');
						errno = 1;
						resolve();					
						break;
					}else{
						console.log('用户输入密码错误！');
						errno = 2;
						resolve();
						break;
					}
				}
				if(i == userListData.length-1){
					console.log('检索失败！')
					errno = -1;
					resolve();
				}
			}	
		})	
	}
	
	await checkUser().then(() => {
		if(errno == 1){
			ctx.body = {
				errno: 0,
				msg: 'Login in success!'
			}
		}else if(errno == 2){
			ctx.body = {
				errno: 1,
				msg: 'Password Wrong!'
			}
		}else{
			ctx.body = {
				errno: 2,
				msg: 'User doesn‘t exist.'
			}
		}
		console.log("Checking Complete!")
	})
	
})







app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);


