// JavaScript Document
<!--
function change_faceimg(img_obj,chg_obj) {
	var imgobj=document.getElementById(img_obj);
	imgobj.src=chg_obj.options[chg_obj.selectedIndex].value;
}

function droplist_pageurl(pageurl,chg_obj) {
	parent.location=pageurl + chg_obj.options[chg_obj.selectedIndex].value;
}

function user_login_chk()
{
	var username=document.login_frm.username.value;
	var password=document.login_frm.password.value;
	var valcode=document.login_frm.valcode.value;
	if (username=="" || username==null)
	{
		alert("对不起！\n\n请先输入登陆用户名！");
		document.login_frm.username.focus();
		return false;
	}
	if (password=="" || password==null)
	{
		alert("对不起！\n\n请先输入登陆密码！");
		document.login_frm.password.focus();
		return false;
	}
	if (valcode=="" || valcode==null)
	{
		alert("对不起！\n\n请先输入验证码！");
		document.login_frm.valcode.focus();
		return false;
	}
	//document.login_frm.submit();
}

//检测搜索输入信息
function search_chk()
{
  var keywords=document.search_frm.keywords.value;
  if (keywords=="" || keywords==null || keywords=="请输入关键词")
  {
    alert("请输入要搜索的关键词！");
    document.search_frm.keywords.focus();
    return false;
  }
}

//检测代理商搜索输入信息
function agentsearch_chk()
{
  var keywords_1=document.agent_searchfrm.topicword.value;
  var keywords_2=document.agent_searchfrm.lxnameword.value;
  if ((keywords_1=='' || keywords_1==null || keywords_1=='请输入名称') & (keywords_2=='' || keywords_2==null || keywords_2=='请输入联系人'))
  {
    alert("请输入要搜索的关键词！");
    return false;
  }
}

//友情链接打开合伙网址
function open_alinkurl(sel_var,selObj)
{
	if (selObj)
	{
		var selected_val;
		selected_val=selObj.options[selObj.selectedIndex].value;
		if (selected_val!=sel_var)
		{
			//eval("self.location='"+ selected_val +"'");
			//open_newwin(selected_val,"alink_url");
			window.open(selected_val,"alink_url");
		}
		else
		{
			return;
		}
	}
}

//打开固定新窗口
var open_winobj;
function open_newwindow(url_var,win_name)
{
	var win_width=screen.width;
	var win_height=screen.height;
	if (open_winobj)
	{
		open_winobj.close();
		open_winobj=null;
		open_winobj=window.open(url_var,win_name,"width=" + win_width + ",height=" + win_height + ",top=0,left=0,scrollbars=1, resizable=yes");
	}
	else
	{
		open_winobj=window.open(url_var,win_name,"width=" + win_width + ",height=" + win_height + ",top=0,left=0,scrollbars=1, resizable=yes");
	}
}

//打开新窗口
function open_newwin(url_var,win_name)
{
	var win_width=screen.width/2;
	var win_height=screen.height/2;
	window.open(url_var,win_name,"width=" + win_width + ",height=" + win_height + ",top=0,left=0,scrollbars=1, resizable=yes");
}

//添加到收藏夹中
function addFavorite(site_url,site_name)
{
	var the_pagetitle=site_name;
	var the_pageurl=site_url;
	if(the_pageurl=="")
	{
		the_pageurl=window.location.href;
	}
	if(the_pagetitle=="")
	{	
		the_pagetitle=document.title;
	}
	try
	{
		window.external.addFavorite(the_pageurl,the_pagetitle);
	}
	catch(e)
	{
		try
		{
			window.sidebar.addPanel(the_pagetitle,the_pageurl,"");
		}
		catch(e)
		{
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加！");
		}
	}
}

//将该网站设为主页
function setHomePage(site_url)
{
	var the_pageurl=site_url;
	if(the_pageurl=="")
	{
		the_pageurl=window.location.href;
	}
	try
	{
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage(the_pageurl);
	}
	catch(e) 
	{
		if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch (e){
				alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config，然后将项 signed.applets.codebase_principal_support 值该为true" );
			}
		}
		else
		{
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + the_pageurl + "】设置为首页。");
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',the_pageurl);
	}
}

//返回网页标题的相关字符串
function get_pagetitle(split_chr,new_pagetit)
{
	var titleitems,return_title;
	var the_pagetitle=document.title;
	return_title=the_pagetitle;
	if(the_pagetitle.indexOf(split_chr)>0)
	{
		titleitems=the_pagetitle.split(split_chr);
		if(titleitems[1])
		{
			return_title=the_pagetitle.replace(titleitems[1],new_pagetit)
		}
		else
		{
			if(new_pagetit)
			{
				return_title=the_pagetitle + split_chr + new_pagetit;
			}
		}
	}
	else
	{
		return_title=new_pagetit;
	}
	return return_title;
}

//------购物车引用的js函数定义开始--------
function update_buynum(theObjStr,theI_Id,theGoUrl)
{
	var theINum=document.getElementById(theObjStr+theI_Id).value;
	if(parseInt(theINum)>0)
	{
		if(theGoUrl)
		{
			parent.location.href=theGoUrl + "&itemid=" + theI_Id + "&itemnum=" + theINum;
		}
		else
		{
			parent.location.href="/ajax_asp/api_plus/shopping_check.asp?action=a2&itemid=" + theI_Id + "&itemnum=" + theINum;
		}
	}
}
function confirm_gobuy(frmObjId,theObjId,theGoUrl)
{
	var thetprice=document.getElementById(theObjId).value;
	if(parseFloat(thetprice)<0)
	{
		return false;
	}
	//checknull_val(frmObjId);
	if(theGoUrl)
	{
		parent.location.href=theGoUrl;
	}
	else
	{
		parent.location.href="/ajax_asp/api_plus/myorders_add.asp";
	}
}
function clear_buynum(theMsgTxt,theGoUrl)
{
	if(window.confirm(theMsgTxt))
	{
		if(theGoUrl)
		{
			parent.location.href=theGoUrl;
		}
		else
		{
			parent.location.href="/ajax_asp/api_plus/shopping_check.asp?action=c1";
		}
	}
}
//------购物车引用的js函数定义结束--------

//-->