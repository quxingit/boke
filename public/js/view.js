$(function(){
	/*$(".lunbtn").on('click',function(){
		
	})
*/
$(".lunbtn").click(function(){
	$.ajax({
		type:'post',
		url:'/api/comment/post',
		data:{
			contentid: $('#contentId').val(),
			content:$('.elementlun').val(),
		},
		dataType:'json',
		success:function(responseData){
			//console.log(responseData);
			$('.elementlun').val('');
			renderComment(responseData.data.comments.reverse());
		}
		//反转评论顺序  reverse()
	})
})

$.ajax({
		type:'get',
		url:'/api/comment',
		data:{
			contentid: $('#contentId').val(),
		},
		dataType:'json',
		success:function(responseData){
			//console.log(responseData);
			renderComment(responseData.data.reverse());
		}
		//反转评论顺序  reverse()
	})




function renderComment(comments){
	$('.lunshu span').html(comments.length);

	var html='';
	for(var i=0;i<comments.length;i++){
		html+='<li>'+
					'<div class="bujv">'+
						'<div class="bujvzhe">'+comments[i].username+'</div>'+
						'<div class="bujvtime">'+formatdate(comments[i].postTime)+'</div>'+
					'</div>'+
					'<p>'+comments[i].content+'</p>'+
				'</li>';

	}

	$('.lunul ul').html(html);
}


function formatdate(d){
	var datel=new Date(d);
	return datel.getFullYear()+'年'+(datel.getMonth()+1)+'月'+datel.getDate()+'日'+datel.getHours()+':'+datel.getMinutes()+':'+datel.getSeconds();
}


})