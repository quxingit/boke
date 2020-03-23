var express=require('express');
//var mysql=require('mysql');
var mongoose=require('mongoose');
var path = require("path");
var bodyParser=require('body-parser');
//加载模板处理模块
var swig=require('swig');
//加载cookies模块
var Cookies=require('cookies');

//创建app应用=》nodejs http.createserver()
var app=express();


var User=require("./models/user");

//配置应用模板
//定义当前应用所使用的模板引擎
//参数1：模板引擎名称，也是模板文件的后缀；参数2：表示用于解析处理模板内同的方法
app.engine('html',swig.renderFile);
//设置模板文件的存放目录，参数1：必须是view；参数2：目录
app.set('views','./views');
//注册索使用的模板引擎，第一个参数必须是view enggine ；第二个参数和app.engine这个方法中定义的模板引擎的名称是一致的
app.set('view engine','html');

app.use(express.static(path.join(__dirname, 'public')));


//在开发过程共需要取消模板缓存
swig.setDefaults({cache:false});

//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}));

//这只cookies
app.use(function(req,res,next){
	req.cookies=new Cookies(req,res);

	//解析登录用户的cookies信息
	req.userInfo={};
	if(req.cookies.get('userInfo')){
		try{
			req.userInfo=JSON.parse(req.cookies.get('userInfo'));

			//获取当前登录用户的类型
			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
				next();
			})
		}catch(e){
			next();
		}
	}else{
		next();
	}
});

/*
根据不同的功能划分模块
 */
app.use('/admin',require('./router/admin'));
app.use('/api',require('./router/api'));
app.use('/',require('./router/main'))

/*//链接数据库
var connection=mysql.createConnection({
	host : 'localhost',
	port : '3306',
	user : 'root',
	password : 'shen59913141122',
	database : 'boke'
});

connection.connect(function(err){
if(err){
	console.log("链接失败");
	throw(err)
}else{
	console.log("链接成功");
}
});
*/

app.get('/', function (req, res,next) {
   //res.send('<h1>Hello World</h1>');
   //第一个参数：白哦是模板的文件，相对view目录
   res.render('main/index');
})



mongoose.connect('mongodb://localhost:27018/boke',{useMongoClient:true},function(err){
	if (err) {
		console.log('数据库链接失败');
	}else{
		console.log('数据库链接成功');
		var server = app.listen(8087, function () {
		  console.log('正在监听');
		 
		})
	}
});
