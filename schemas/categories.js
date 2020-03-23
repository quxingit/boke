/*var mysql=require('mysql');

connection.query("CREATE TABLE person(id int,user varchar(255),password varchar(255))",function(err,result){
if(err){throw err}else{
	console.log("创建表成功")
}
})
*/
 
 var mongoose=require('mongoose');

 //分类的表结构
 module.exports=new mongoose.Schema({
 	//类名
 	name:String,
 	
 })
