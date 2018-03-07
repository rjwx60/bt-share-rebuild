'use strict'

/*
	样例：
	"username":"ZYS",
	"email":"ZYS666@gmail.com",
	"password":"123456"},
*/

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	tag:Number,
	data:[
		{
			username:String,
			email:String,
			password:String
		}
	]
})

// 添加 mongoose 静态方法，静态方法在 Model层 使用
userSchema.statics.findUserName = function(name,cb) {
    return this.find({username: name},cb);
}

module.exports = mongoose.model('User',userSchema)