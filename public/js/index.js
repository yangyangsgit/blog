;$(function(){
	var $loginBox = $('#loginBox');
	var $registerBox = $('#registerBox');
	var $sign = $('#sign');
	var $login = $('#login');
	var $lagout = $('#lagout')



	$sign.on('click',function(){
		var formData = $('#sign-form').serialize();
		console.log(formData);
		$.ajax({
            url: '/api/user/register',
            type: 'post',
            data:formData,
            success: function (data) {
            	console.log('成功');
        		console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
	})

	$login.on('click',function(){
		var formData = $('#login-form').serialize();
		console.log(formData);
		$.ajax({
            url: '/api/user/login',
            type: 'post',
            data:formData,
            success: function (data) {
            	console.log('成功');
        		console.log(data);
        		window.location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
	})

	//退出
	$lagout.on('click',function(){
		$.ajax({
            url: '/api/user/logout',
            // type: 'post',
            success: function (data) {
            	//退出成功
            	if(data.code==1){
            		window.location.reload();
            	} else{
            		alert('退出失败');
            	}
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
	})

})