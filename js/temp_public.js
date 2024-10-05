/* ----javascript------ */
var thenow_i=0;
//改变相关对象的背景图
function chgobj_thebg(bg_var)
{
	if(bg_var>0){ thenow_i=bg_var-1; }
	if(document.getElementById(bg_obj))
	{
		var bgObj=document.getElementById(bg_obj);
		var bgUrl=theimgs[thenow_i];
		if(bg_type==0)
		{
			//bgObj.style.background="url(" + bgUrl + ")";
			bgObj.style.background="url(" + bgUrl + ") no-repeat";
		}
		else
		{
			bgObj.style.background=bgUrl;
		}
	}
}

//加载时引用的自动函数
function auto_chgbg()
{
	var thernd_num;
	if(thenow_i==theimgs.length)
	{
		thenow_i=0;
	}
	chgobj_thebg();
	//返回随机数
	thernd_num=Math.floor(Math.random()*theimgs.length);
	thenow_i=thernd_num;
	//thenow_i+=1;
	setTimeout("auto_chgbg();",rotation_time);
}