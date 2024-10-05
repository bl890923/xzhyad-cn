// JavaScript Document
<!--
var popwin = new WebPopWin();
var onlineEditObj = "onlineEditObj";

//-----页面高级在线编辑------
function ShowEditWindow(url){
	popwin.Mark(true);
	popwin.DataLoading();
	var divPage = document.createElement("DIV");
	divPage.id = onlineEditObj;
	divPage.style.display = "none";
	
	var divbotton = document.createElement("DIV");
	//divbotton.style.position = "relative";
	divbotton.style.position = "fixed";
	divbotton.className = "editBtnDiv";
	
	var topbtn_div="<div class=\"leftBtnBar\" onclick=\"chg_display(this,'rightBtnBar')\"><img src=\"/onlinecss/images/tbar_sx.gif\" />隐藏</div>";
	topbtn_div=topbtn_div + "<div id=\"rightBtnBar\" class=\"rightBtnBar\">";
	topbtn_div=topbtn_div + "<div class=\"float_left\"><a href=\"admins.asp\" class=\"a1\"><img src=\"/onlinecss/images/r_quitad.gif\" />返回普通管理模式</a></div>";
	topbtn_div=topbtn_div + "<div class=\"float_right\">";
	topbtn_div=topbtn_div + "<a href=\"javascript:void(0);\" onclick=\"javascript:var theIframe=parent.onlineEditObj_iframe || parent.window.frames['onlineEditObj_iframe']; theIframe.location.reload()\" class=\"a2\"><img src=\"/onlinecss/images/b_shuaxin.gif\" />刷新</a>";
	//topbtn_div=topbtn_div + "<a href=\"change_nowedition.asp?getnurl=create_htmlfile.asp?isonline=1\" onclick=\"parent.show_newwindiv()\" class=\"a3\"><img src=\"/onlinecss/images/b_gengxin.gif\" />保存更新</a>";
	topbtn_div=topbtn_div + "<a href=\"javascript:void(0);\" onclick=\"javascript:parent.show_newwindiv(); var theIframe=parent.onlineEditObj_iframe || parent.window.frames['onlineEditObj_iframe']; theIframe.location.href='change_nowedition.asp?getnurl=create_htmlfile.asp?isonline=1';\" class=\"a3\"><img src=\"/onlinecss/images/b_gengxin.gif\" />保存更新</a>";
	topbtn_div=topbtn_div + "<a href=\"/index.asp\" target=\"_blank\" class=\"a4\"><img src=\"/onlinecss/images/b_zhuye.gif\" />浏览网站</a>";
	topbtn_div=topbtn_div + "<a href=\"admins_login.asp?action=relog\" class=\"a5\"><img src=\"/onlinecss/images/b_tuichu.gif\" />退出管理</a>";
	topbtn_div=topbtn_div + "</div>";
	topbtn_div=topbtn_div + "</div>";
	divbotton.innerHTML = topbtn_div;
	
	/*
	var divsplitbar = document.createElement("DIV");
	divsplitbar.style.position = "relative";
	divsplitbar.className = "splitBarDiv";
	*/
	
	divPage.style.position = "absolute";
	divPage.style.zIndex = 1000;
	divPage.style.top = "0px";
	//divPage.style.top = "20px";
	//divPage.style.bottom = "50px";
	var editpage = document.createElement("iframe");
	editpage.id = onlineEditObj+"_iframe";
	editpage.name = onlineEditObj+"_iframe";
	editpage.className = onlineEditObj+"_iframe";
	editpage.style.backgroundColor = "#ffffff";
	editpage.frameBorder = 0;
	editpage.scrolling = "no";
	//editpage.scrolling = "auto";
	var theWidth = "1003";
	/* ----改变页面的显示结构1（全不满屏）----
	if(document.body.offsetWidth>theWidth){
		divPage.style.left = (document.body.offsetWidth-theWidth)/2+"px";
		//divPage.style.right = (document.body.offsetWidth-theWidth)/2+"px";
	}else{
		divPage.style.left = "0px";
		//divPage.style.right = "5px";
	}
	divPage.style.width = theWidth+"px";
	*/
	editpage.style.width = "100%";
	
	/* ----改变页面的显示结构3（全部满屏）---- */
	divPage.style.left = "0px";
	divPage.style.width = "100%";
	
	/* ----改变页面的显示结构2（仅头部满屏）----
	divPage.style.width = "100%";
	editpage.style.width = theWidth+"px";
	editpage.style.position = "relative"
	editpage.style.top = "0px";
	if(document.body.offsetWidth>theWidth){
		editpage.style.left = (document.body.offsetWidth-theWidth)/2+"px";
		//editpage.style.right = (document.body.offsetWidth-theWidth)/2+"px";
	}else{
		editpage.style.left = "0px";
		//editpage.style.right = "5px";
	}
	*/
	editpage.style.height = "100%";
	editpage.src = url;
	
	divPage.appendChild(divbotton);
	//divPage.appendChild(divsplitbar);
	divPage.appendChild(editpage);
	document.body.appendChild(divPage);
	popwin.WinList[popwin.WinList.length] = divPage;
}

function chg_display(theObj,objId)
{
	var the_obj=eval(theObj);
	if(document.getElementById(objId))
	{
		var chg_obj=document.getElementById(objId);
		if(chg_obj.style.display=='none')
		{
			the_obj.innerHTML="<img src=\"/onlinecss/images/tbar_sx.gif\" />隐藏";
			chg_obj.style.display='block';
			the_obj.style.width='auto';
			the_obj.title="隐藏工具栏";
		}
		else
		{
			chg_obj.style.display='none';
			the_obj.innerHTML="<img src=\"/onlinecss/images/tbar_xs.gif\" />显示工具栏";
			the_obj.style.width='100%';
			the_obj.title="显示工具栏";
		}
	}
}

//-->