'use strict'

/*
	样例：
	hasMore: true,
	data:[
		{
			id:0,
			time: "2017-11-4 23:34",
			title: "Btsync-0",
			key: "BAYYH4ZCKWQVSWDF4QRS44T3BQHJZENJ2",
			description: "description-00000",
			comments:[
				{
					username: "rjw",
					text: "It help me a lot. Thx for share!",
					postTime: "2017-4-25 10:45",
					agreeNumber: "67",
					disagreeNumber: "4"
				},
				{
					username: "zzp",
					text: "I love it very much!! HelloWorld",
					postTime: "2017-4-25 10:45",
					agreeNumber: 67,
					disagreeNumber: 4
				}
			]
		},
		....
	]
*/

var mongoose = require('mongoose');

var sourceSchema = mongoose.Schema({
	hasMore:{
		type:Boolean,
		default:true
	},
	data:[
		{
			id:Number,
			time:{
				type:String,
				default:Date.now()
			},
			title:String,
			key:String,
			description:String,
			comments:[
				{
					username:String,
					text:String,
					postTime:{
						type:String,
						default:Date.now()
					},
					agreeNumber:{
						type:Number,
						default:0
					},
					disagreeNumber:{
						type:Number,
						default:0
					}
				}
			]
		}
	]
})


module.exports = mongoose.model('Source',sourceSchema)