/*
 * 定top
 */
$(document).ready(function(){
	
	//$(".nav").capacityFixed();
	//---------------------------------------------------------
	//先用面向过程   然后学着封装简单的带参函数
	var elementTop = 0;// 保存一个全局变量 ==》elementTop 此变量只能有一个不为0的值。
	$(window).scroll(function(){
		if($("#topnav").css("position") != "fixed"){//此判断保证导航元素 位置正确 不受fixed干扰
			elementTop = $("#topnav").offset().top;//此方法返回一个对象{left:"",top:""} 我们只需要top即可	
		}
//		var scrollTop = window.pageYOffset  //用于FF
//              || document.documentElement.scrollTop  
//              || document.body.scrollTop  
//              || 0;
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
//		var scrollTop = $("body").scrollTop();//不兼容除谷歌外//此方法返回 滚动条的距上的距离
		console.log(scrollTop+"------------"+elementTop+"----------"+$("#topnav").css("position"));
		if(scrollTop > elementTop){
			$("#topnav").css({"position":"fixed","top":"0","left":"0","right":"0"})
		}else if(scrollTop < elementTop){
			$("#topnav").css({"position":"relative","top":"0","left":"0"})
		}
	})
	//---------------------------------------------------------
	$("#nav sf-js-enabled sf-shadow > li").not(".active").hover(function(){
		$(this).addClass("navmoon");
	},function(){
		$(this).removeClass("navmoon");
	});
	
});