//���ض���
$(function(){	
	$(window).scroll(function() {		
		if($(window).scrollTop() >= 100){ //���¹������ش������ֵʱ��������~
			$('.actGotop').fadeIn(500); //�����ʱ�䣬ԽС���ֵ�Խ��~
		}else{    
			$('.actGotop').fadeOut(500); //������ʱ�䣬ԽС��ʧ��Խ��~
		}  
	});
	$('.actGotop').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);}); //�������ͣ��ʱ�䣬ԽС��ʧ��Խ��~
});


