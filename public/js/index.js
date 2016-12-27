;$(function(){
	var $loginBox = $('#loginBox');
	var $registerBox = $('#registerBox');
	var $sign = $('#sign');


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

})