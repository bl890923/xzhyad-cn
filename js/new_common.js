/******************************************************************************
  SupeSite/X-Sapce - common js for SS/XS
  Copyright 2001-2006 Comsenz Inc. (http://www.comsenz.com|http://www.maifou.net|http://www.yisence.com)
*******************************************************************************/
function getbyid(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (document.all) {
		return document.all[id];
	} else if (document.layers) {
		return document.layers[id];
	} else {
		return null;
	}
}

var isIE = navigator.userAgent.toLowerCase().indexOf('ie');

function showajaxdiv(url, width) {
	//var x = new Ajax('statusid', 'XML');
	var x = new Ajax('statusid', 'HTML');
	x.get(url, function(s){
		if(getbyid("xweb-ajax-div")) {
			var divElement = getbyid("xweb-ajax-div");
		} else {
			var divElement = document.createElement("DIV");
			divElement.id = "xweb-ajax-div";
			divElement.className = "xweb-ajaxdiv";
			document.body.appendChild(divElement);
		}
		divElement.style.cssText = "width:"+width+"px;";
		var userAgent = navigator.userAgent.toLowerCase();
		var is_opera = (userAgent.indexOf('opera') != -1);
		var clientHeight = 0; 
		var scrollTop = 0; 
		if(is_opera) {
			clientHeight = document.body.clientHeight /2;
			scrollTop = document.body.scrollTop;
		} else {
			clientHeight = document.documentElement.clientHeight /2;
			scrollTop = document.documentElement.scrollTop;
		}
		//divElement.innerHTML = s.lastChild.firstChild.nodeValue;
		if(s)
		{
			divElement.style.display = "block";
		}		
		divElement.innerHTML = s;
		divElement.style.left = (document.documentElement.clientWidth/2 + document.documentElement.scrollLeft - width/2)+"px";
		divElement.style.top = (clientHeight + scrollTop - divElement.clientHeight/2)+"px";						
	});	
}

function showajax_div(status_id,showhtml_obj,showobj_class,url,width) {
	//var x = new Ajax('statusid', 'XML');
	var x = new Ajax(status_id, 'HTML');
	x.get(url, function(s){
		if(getbyid(showhtml_obj)) {
			var divElement = getbyid(showhtml_obj);	
		} else {
			var divElement = document.createElement("DIV");
			divElement.id = showhtml_obj;
			divElement.className = showobj_class;
			document.body.appendChild(divElement);
		}
		if(width)
		{
			divElement.style.cssText = "width:"+width+"px;";
		}
		var userAgent = navigator.userAgent.toLowerCase();
		var is_opera = (userAgent.indexOf('opera') != -1);
		var clientHeight = 0; 
		var scrollTop = 0; 
		if(is_opera) {
			clientHeight = document.body.clientHeight /2;
			scrollTop = document.body.scrollTop;
		} else {
			clientHeight = document.documentElement.clientHeight /2;
			scrollTop = document.documentElement.scrollTop;
		}
		//divElement.innerHTML = s.lastChild.firstChild.nodeValue;
		if(s)
		{
			divElement.style.display = "block";
		}
		divElement.innerHTML = s;
		if(width)
		{
			divElement.style.left = (document.documentElement.clientWidth/2 + document.documentElement.scrollLeft - width/2)+"px";
		}
		else
		{
			divElement.style.left = (document.documentElement.clientWidth/2 + document.documentElement.scrollLeft)+"px";
		}
		divElement.style.top = (clientHeight + scrollTop - divElement.clientHeight/2)+"px";

	});	
}