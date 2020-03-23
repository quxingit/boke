var express=require('express');
var router=express.Router();
var Category=require('../models/category');
var Content=require('../models/Content');

var data;

/*处理通用的数据*/

router.use(function(req,res,next){
	data={
		userInfo:req.userInfo,
		categories:[]
	}

	Category.find().then(function(categories){
		data.categories=categories;
		next();
	});


})

/*

首页
 */


router.get('/',function(req,res,next){

/*
	res.render('main/index',{
		userInfo:req.userInfo
	});
	data={
		category:req.query.category||'',
		count:0,
		page:Number(req.query.page||1),
		limit:4,
		pages:0
	}
*/
	data.category=req.query.category||'';
	data.count=0;
	data.page=Number(req.query.page||1);
	data.limit=4;
	data.pages=0;

	var where={};
	if (data.category) {
		where.category=data.category
	}

	//读取所有的分类信息
	/*Category.find().then(function(categories){
		data.categories=categories;
		return Content.where(where).count();
	})*/

	Content.where(where).count().then(function(count){

		data.count=count;
		//计算总页数
		data.pages=Math.ceil(data.count/data.limit);

		//取值不能超过pages
		data.page=Math.min(data.page,data.pages);

		//不能小于1
		data.page=Math.max(data.page,1);
		
		var skip=(data.page-1)*data.limit;


		return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({
			addtime:-1
		});

	}).then(function(contents){
		data.contents=contents;
		res.render('main/index',data);
	})
})

router.get('/view',function(req,res){
	var contentid=req.query.contentid||'';

	Content.findOne({
		_id:contentid
	}).then(function(content){
		data.content=content;
		content.views++;
		content.save();
		res.render('main/view',data);
	})
})


module.exports=router;