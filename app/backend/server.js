// 此处是项目前期的后端管理，用的是 nodejs 的文件管理模块
// 新的后端管理改由 mongoose 操作 mongodb 在 backend 文件夹下，可选择其中之一运行

// 如 npm run mock 运行 前期的后端模块
// 而 npm run backend 运行 后期的模块

var Koa = require('koa');
var Router = require('koa-router');
var KoaBody = require('koa-body');

var path = require('path');

var app = new Koa();
var router = new Router();


var mongoose = require('mongoose');
// 连接 reactBtShare
mongoose.connect('mongodb://localhost/reactBtShare');

// 引入 model
var User = require('./models/user.js');
var Source = require('./models/source.js');

var db = mongoose.connection;

// 根据连接的状态执行不同的功能
// 连接失败
db.on('error', console.error.bind(console, 'connection error:'));
// 连接成功
db.once('open', function() {

/*	var source1 = new Source({ 
		hasMore: true,
		data:[
			{
				id:0,
				time: "2017-11-4 23:34",
				title: "17年12月高分电影：铁雨，至暗时刻，水形物语，摩天轮，勇敢者游戏：决战丛林，妖猫传，灾难艺术家，神秘博士：2017圣诞特别篇",
				key: "BESYUT2UKEDWWE2SOQE74C6EZ4LTPJBAW",
				description: "17年12月高分电影：铁雨，至暗时刻，水形物语，摩天轮，勇敢者游戏：决战丛林，妖猫传，灾难艺术家，神秘博士：2017圣诞特别篇",
				comments:[
					{
						username: "rjw",
						text: "It help me a lot. Thx for share!",
						postTime: "2017-4-25 10:45",
						agreeNumber: 33,
						disagreeNumber: 2
					}
				]
			}
		]
	});


	source1.save(function(err,doc){
	    if(err){
	        console.log("error :" + err);
	    } else {
	        console.log(doc);
	    }
	});*/


/*	// 要实现嵌套查询，并添加数据
	Source.findOne({'hasMore':true},function(err,doc){
		doc.data.push({
			id:7,
			time: "2017-11-4 23:34",
			title: "[美剧] 9号秘事.第四季.Inside.No.9.S04 更新至 E05 一Key在手，保持更新",
			key: "BTZTXLEAD7YXDAIZLJ5BQYFIFY66USKD3",
			description: "[美剧] 9号秘事.第四季.Inside.No.9.S04 更新至 E05 一Key在手，保持更新",
			comments:[
				{
					username: "rjw",
					text: "It help me a lot. Thx for share!",
					postTime: "2017-4-25 10:45",
					agreeNumber: 33,
					disagreeNumber: 2
				}
			]
		})
		// 除了findOne的回调函数方式有save意外，其余的如链式没有..
		doc.save();
		console.log(doc.data.length)
	})*/


	setTimeout(function(){

/*		// 显示集合中文档的数量
		Source.find().count(function(err,count){
			console.log(count)
		})*/

/*		// 在指定位置，输出此位置后的指定数目的文档
		Source.find(null,null,{skip:0}).limit(3).exec(function(err,docs){
			if(err){
				console.log(err)
			}
			console.log(docs) // return Array
		})*/

/*		// 在文档内部的指定位置，输出此位置后的指定数目的内容
		Source.aggregate().unwind('data').skip(2).limit(4).exec(function(err,docs){
			if(err){
				console.log(err)
			}
			console.log(docs) // return Array
		})
*/

/*		// 这是并列关系 且，而并不是说找到 data 后再往下找
		Source.where('data').where({id:2}).exec(function(err,doc){
			console.log(doc)
		})*/

/*		// 要实现嵌套查询，可以像下面那样
		Source.where('data').where({"data.id":2}).exec(function(err,doc){
			console.log(doc[0].data[0])
		})*/

/*		// 要实现嵌套查询，并添加数据
		Source.findOne({"data.id":4},function(err,doc){
			doc.data[0].comments.push({
				username: "zzzzzzzaaaaaaaaaaazzzzap",
				text: "I love it very much!! HelloWorld",
				postTime: "2017-4-25 10:45",
				agreeNumber: 67,
				disagreeNumber: 4
			});
			doc.save()
			console.log(doc.data[0].comments)
		})*/
	},0)

	// 主页资源加载列表
	//（默认返回前x条列表，如果有传递过来的参数则根据参数返回相应部分的资源列表）
	// 引入 KoaBody() 便可以获取用户端返回的内容信息
	router.post('/api/sourceListUpdata',KoaBody(), async(ctx,next) => {
		
		// console.log(ctx.request.body)  
		// { pageNumber: '1' }

		var sourceListDataLength = 0;
		var pageNumber = 1;		
		// 每页面显示的条数	
		var showListNumber = 12;

		var start = showListNumber * ( pageNumber - 1 );
		var end   = showListNumber * ( pageNumber );
		var chooseSourceListData = [];

		if(ctx.request.body.pageNumber){
			pageNumber = parseInt(ctx.request.body.pageNumber);
		}

		function getSource(){
			return new Promise((resolve)=>{
				// 显示集合中文档的数量
				Source.aggregate().unwind('data').exec(function(err,doc){
					// sourceListDataLength = count;
					sourceListDataLength = doc.length;
					// console.log(sourceListDataLength)
				})
				
				// 在指定位置，输出此位置后 指定数目的文档
				Source.aggregate().unwind('data').skip(start).limit(end).exec(function(err,doc){
					if(err){
						console.log(err)
					}
					// console.log(doc[0]) 好奇怪，每个子项都包含了hasMore？！
					// console.log(doc[1])
					for(let i=0;i<(end-start);i++){
						if(doc[i]){
							chooseSourceListData.push(doc[i].data)
						}
					}
					// chooseSourceListData = doc; // Array 
					resolve();
				})
			})
		}

		await getSource().then(()=>{
			// console.log(chooseSourceListData)
			// 返回信息：
			ctx.body = {
				data: chooseSourceListData,
				allDataLength: sourceListDataLength
			}
		})

	})



	// 用户详情列表获取
	router.post('/api/userDetail',KoaBody(), async(ctx,next) => {
		console.log("checking UserDetail Data...");
		var time,
			title,
			key,
			description,
			targetComments,
			item;

		// console.log(ctx.request.body)  
		// { id: '0' }

		function getuserDetail(){

			var searchId = parseInt(ctx.request.body.id);

			return new Promise((resolve) => {

				Source.aggregate().unwind('data').match({'data.id':searchId}).exec(function(err,doc){
					// console.log(doc)
					item = doc[0].data;
					// console.log(item)
					resolve(item)
				})
			})
		}

		await getuserDetail()
		.then((item)=>{
			time = item.time;
			title = item.title;
			key = item.key;
			description = item.description;

			if(item.comments.length != 0){
				targetComments = item.comments; // Array [{...},{...},]
			}else{
				targetComments = null;
			}
		})
		.then(() => {
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





	// 用户注册的登记存储
	router.post('/api/addUser',KoaBody(),async(ctx, next) => {
		console.log('new User Sign up...');

		// console.log(ctx.request.body)
		// { username: '123', email: '133', password: '123' }
		var requestBody = ctx.request.body;

		function addUser(){
			return new Promise((resolve) => {
				User.find().exec(function(err,docs){
					if(docs.length == 0){
						user1 = new User({
							tag:1,
							data:[
								{
									username:requestBody.username,
									email:requestBody.email,
									password:requestBody.password
								}
							]
						})

						user1.save(function(err,doc){
							if(err){
								console.log(err)
							}else{
								// console.log("first add:",doc)
								resolve();
							}	
						})
					}else{
						User.findOne({'tag':1},function(err,doc){
							// console.log(doc)
							doc.data.push({
								username:requestBody.username,
								email:requestBody.email,
								password:requestBody.password
							})
							doc.save()
							// console.log(doc)
							resolve();
						})
					}
				})
			})
		}

		await addUser()
			.then(() => {
				// 返回客户端信息
				ctx.body = {
					errno: 0,
					msg: 'addUser ok'
				}
				console.log("Sign up Complete!")
		})
	})







	// 验证登录
	// 这段摘自官方文档 “querystring 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串”
	router.post('/api/checkUser',KoaBody(), async(ctx,next) => {

		console.log('Checking dataBase...');

		// console.log(ctx.request.body);        
		// { username: '111', password: '222' }

		// console.log(typeof ctx.request.body)  // object
		// console.log(JSON.stringify(userListData));


		const requestObject = ctx.request.body;
		var errno = -1;

		function checkUser(){
			console.log("checking...")
			return new Promise((resolve) => {

				User.findOne({'tag':1},function(err,docs){
					// console.log(docs.data)	// Array
					var docDataLength = docs.data.length
					docs.data.map(function(item,index){
						if(item.username == requestObject.username.trim()){
							if(item.password == requestObject.password.trim()){
								console.log('检索成功！');
								errno = 1;
								resolve();					
							}else{
								console.log('用户输入密码错误！');
								errno = 2;
								resolve();
							}
						}
						if(index == docDataLength-1 && errno != 1 && errno != 2){
							console.log('检索失败！')
							errno = -1;
							resolve();
						}
					})
				})
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







	// 评论的增加
	router.post('/api/addReplays',KoaBody(),async(ctx,next) => {

		console.log("adding Replays...");
		// console.log(ctx.request.body)
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
			agreeNumber: parseInt(request.agreeNumber),
			disagreeNumber: parseInt(request.disagreeNumber)
		});

		var newSourceListData;

		function addReplay(){
			return new Promise((resolve) => {

				Source.findOne({'hasMore':true},function(err,doc){
					doc.data.map(function(item,index){
						if(item.id == id){
							item.comments.unshift(objData)
							doc.save()
							resolve()
						}
					})
				})
			})
		}

		await addReplay().then(() => {
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
		// console.log(request);

		function addSource(){
			return new Promise((resolve) => {
				Source.findOne({'hasMore':true},function(err,doc){
					var id = doc.data.length;
					var objData = new Object({
						id:id,
						time: request.time,
						title: request.title,
						key: request.key,
						description: request.description,
						comments: []
					});
					doc.data.push(objData);
					doc.save()
					resolve()
				})
			})
		}

		
		await addSource().then(() => {
			// 返回客户端信息
		    ctx.body = {
		        errno: 0,
		        msg: 'shareSource ok'
		    }
		    console.log('new Source shared Complete!');
		})
	})





	app.use(router.routes());
	app.use(router.allowedMethods());

	app.listen(3000);


});






















































