$(function(){
	
 $(".menu_bt").click(function(){
	 $(this).toggleClass("open");
	$(".page-overlay").toggleClass("black");  
	$(".logo").toggleClass("gao"); 
})
 
//全部客户列表
 
//默认状态

if($(window).width()>768)
{

if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").removeClass("add"); 
}
	
//滚动的时候
$(window).scroll(function(){
     if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").removeClass("add"); 
    }
 
 });	

} else{
 if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").addClass("add"); 
}

 $(window).scroll(function(){
     if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").addClass("add"); 
    }
 
 });	

}
 
 
//窗口改变大小 

$(window).on('resize',function(){
  
 if($(window).width()>768)
{

if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").removeClass("add"); 
}
	
//滚动的时候
$(window).scroll(function(){
     if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").removeClass("add"); 
    }
 
 });	

} else{
 if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").addClass("add"); 
}

 $(window).scroll(function(){
     if ($(window).scrollTop()>0) {
      $(".header").addClass("add"); 
        } else {
		 $(".header").addClass("add"); 
    }
 
 });	

} 
});  
 
});














