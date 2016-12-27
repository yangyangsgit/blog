var mongoose = require('mongoose');
//用户的表结构
module.exports = new mongoose.Schema({
	username:String,
	password:String
});
// var Schema = mongoose.Schema;
// 
// var users = new Schema({
//   username:  String,
//   password: String
 
// });

// module.exports = users;