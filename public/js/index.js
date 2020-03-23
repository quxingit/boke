$(function(){
	$(".login_text").click(function(){
		$(".login").hide();
		$(".newuser").show();
	})

	$(".newuser_text").click(function(){
		$(".newuser").hide();
		$(".login").show();
	})


	$(".newuser_button").click(function(){
		$.ajax({
			type:'post',
			url: '/api/user/register',
			data:{
				username: $(".newuser").find('[name="username"]').val(),
				password: $(".newuser").find('[name="password"]').val(),
				repassword: $(".newuser").find('[name="repassword"]').val(),
			},
			dataType:'json',
			success:function(result){
				console.log(result);
				$(".newuser").find('.warom').html(result.message);

				if(!result.code){
					//注册成功
					setTimeout(function(){
						$(".newuser").hide();
						$(".login").show();
					},1000);
				}
			}
		});
	});

	//登录
	$(".login_button").click(function(){
		$.ajax({
			type: 'post',
			url: 'api/user/login',
			data:{
				username: $(".login").find('[name="name"]').val(),
				password: $(".login").find('[name="password"]').val()
			},
			dataType:'json',
			success:function(result){
				console.log(result);

				$(".login").find('.warom').html(result.message);

				if (!result.code) {
					setTimeout(function(){
						/*$(".login").hide();
						$(".userInfo").show();
						//显示登录用户信息
						$(".userInfo").find('.username').html(result.userInfo.username);
						$(".userInfo").find('.info').html('你好欢迎光临我的博客');
						*/
						window.location.reload();
					},1000)
				}
			}
		})
	})

	$('.tuichu').on('click',function(){
		$.ajax({
			url: 'api/user/logout',
			success: function(result){
				if (!result.code) {
					window.location.reload();
				}
			}
		})
	})

})