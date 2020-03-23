/*var mysql=require('mysql');

connection.query("CREATE TABLE person(id int,user varchar(255),password varchar(255))",function(err,result){
if(err){throw err}else{
	console.log("创建表成功")
}
})
*/
 
 var mongoose=require('mongoose');

 //用户的表结构
 module.exports=new mongoose.Schema({
 	//用户名
 	username:String,
 	//密码
 	password:String,
 	//是否是管理员
 	isAdmin: {
 		type: Boolean,
 		default: false
 	}
 })
