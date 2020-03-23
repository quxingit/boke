var mongoose=require('mongoose');
module.exports=new mongoose.Schema({
	//关联字段：内容分类的id
	category:{
		//类型
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:'category'
	},
	//内容标题
	title:String,
	//简介
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},

	addtime:{
		type:Date,
		default:''
	},
	views:{
		type:Number,
		default:0
	},
	description:{
		type:String,
		default:''
	},

	//内容
	content:{
		type:String,
		default:''
	},

	//评论
	comments:{
		type:Array,
		default:[]
	}	
/*
	category:String,
	title:String,
	description:String,
	content:String
*/
});