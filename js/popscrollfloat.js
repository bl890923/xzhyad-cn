<!--
var scrollFloat_MinMax=0;
function displayNoneObj(theObj)
{
	if(theObj)
	{
		theObj.style.display='none';
		popwin.isEditManage=false;
	}
}

function popScrollFloat(parentWinObj) {
	var moveTimer=1;	//表示移动的间隔时间
	var moveNumber=100;	//表示移动的位置大小值
	var theWinObj=document;
	if(parentWinObj)
	{
		theWinObj=eval(parentWinObj);
	}
	function moveObj(theObj) {
		var theScrollTop = window.pageYOffset || theWinObj.documentElement.scrollTop || theWinObj.body.scrollTop || 0;
		var theScrollLeft = window.pageXOffset || theWinObj.documentElement.scrollLeft || theWinObj.body.scrollLeft || 0;
		
		//表示窗体的可视界面高度大小
		//var window_Height=window.screen.availHeight || 0;
		var window_Height=theWinObj.documentElement.clientHeight || 0;
		window_Height=window_Height-33;
		
		//计算浮动对象的新位置参数
		if(theObj.initTop>0)
		{
			theScrollTop=theScrollTop + theObj.initTop;
		}
		else
		{
			if(window_Height>0)
			{
				theScrollTop=theScrollTop + window_Height - theObj.offsetHeight;
			}
		}
		var newTTop = theScrollTop - theObj.offsetTop;
		with (theObj.style) {
			top = theObj.offsetTop + (newTTop != 0 ? newTTop / Math.abs(newTTop) : 0) * Math.min(Math.abs(newTTop), moveNumber) + "px";
			left = "0px";
		}
		if(popwin)
		{
			var isShowFloat=popwin.isEditManage;
			if(isShowFloat)
			{
				theObj.style.display = "block";
			}
			else
			{
				theObj.style.display = "none";
			}
		}
		/*
		if (theObj.person) {
			with (theObj.person.style) {
				top = theObj.offsetTop + "px";
			}
		}
		*/
	}
	
	/*
	var hiddenObj = function() {
		var parentObj = this.parent;
		window.clearInterval(parentObj.interval);
		parentObj.parentNode.removeChild(parentObj);
		this.parentNode.removeChild(this);
	}
	*/
	
	var hiddenObj = function() {
		var parentObj = this.parent;
		//window.clearInterval(parentObj.interval);
		if(scrollFloat_MinMax==0)
		{
			parentObj.className="minAds";
			this.src="/images/barresume.jpg";
			scrollFloat_MinMax=1;
		}
		else
		{
			parentObj.className="nomralAds";
			this.src="/images/boxmin.jpg";
			scrollFloat_MinMax=0;
		}
	}
	
	this.addFloat = function (theObj, initTop, initLR, initType, closeBtn) {
		/*
		theObj为object对象
		initTop为距离顶端距离
		当initType = 0的时候，initLR为距离左边的距离
		当initType != 0的时候，initLR为距离右边的距离
		closeBtn为关闭按钮
		*/
		var execMove = function () {
			moveObj(theObj);
		};
		
		theObj.person = closeBtn;
		theObj.initTop = initTop;
		theObj.initLR = initLR;
		theObj.initType = initType;
		with (theObj.style) {
			position = "absolute";
			//display = "block";
			
			//表示窗体的可视界面高度大小
			//var windowHeight=window.screen.availHeight || 0;
			var windowHeight=theWinObj.documentElement.clientHeight || 0;
			windowHeight=windowHeight-33;
			
			var theScrollTop = window.pageYOffset || theWinObj.documentElement.scrollTop || theWinObj.body.scrollTop || 0;
			var theScrollLeft = window.pageXOffset || theWinObj.documentElement.scrollLeft || theWinObj.body.scrollLeft || 0;
			if((windowHeight - theObj.offsetHeight)>=0)
			{
				top = windowHeight - theObj.offsetHeight + "px";
			}
			else
			{
				top = theScrollTop + initTop + "px";
			}
			/*
			var windowWidth=parent.$getbyid(onlineEditObj).offsetWidth;
			left = theScrollLeft + (initType == 0 ? initLR : windowWidth - initLR - theObj.offsetWidth);
			*/
			left = "0px";
		}
		
		/*
		if (typeof(closeBtn) != "undefined") {
			with (closeBtn.style) {
				//position = "absolute";
				display = "block";
			}			
			closeBtn.onmousedown = hiddenObj;
			closeBtn.parent = theObj;
		}
		*/
		execMove();
		theObj.interval = window.setInterval(execMove, moveTimer);
	};
}

//-->