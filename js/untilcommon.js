//获取页面上的对象
function $getbyid(id)
{
    var obj=document.getElementById(id);
    if(obj=="undifined")
	{
        obj=null;
	}
    return obj;
}
// end with 
String.prototype.endWith=function(str)
{
    if(str==null||str==""||this.length==0||str.length>this.length)
	{
        return false;
    }
    if(this.substring(this.length-str.length)==str)
	{
        return true;
    }
    else
	{
        return false;
    }
    return true;
}
//start with
String.prototype.startWith=function(str)
{
    if(str==null||str==""||this.length==0||str.length>this.length)
	{
        return false;
    }
    if(this.substr(0,str.length)==str)
	{
        return true;
    }
    else
	{
        return false;
    }
    return true;
}
//去除字符串左右空格
String.prototype.Trim  =  function()
{
    return  this.replace(/(^\s*)|(\s*$)/g,  "");
}
//HTML符号转换
String.prototype.ToString  =  function()
{
    return  this.replace("<","&lt;").replace(">","&gt;");
}

//判断字符串是否为空
String.prototype.isEmpty = function()
{
    return this.Trim().length ==0 ? true : false;
}
function isEmpty(id){
    return $getbyid(id).value.isEmpty();
}

//判断是否是电子邮箱
String.prototype.isEmail = function()
{
    try
	{
        var pattern=/^(([a-zA-Z\-_0-9]+[a-zA-Z\-_0-9\.]+)@[a-zA-Z\-_ 0-9]+\.([a-zA-Z]+(\.)?)?[a-zA-Z]+)$/;
        return pattern.test(this.Trim());
    }
    catch(e)
	{
        return false;
    }
}
function isEmail(id){
    return $getbyid(id).value.isEmail();
}

//判断字符串是否由字母数字组合
String.prototype.isCharAndNum = function()
{
    try
	{
        var pattern=/^([a-z A-Z 0-9]+)$/;
        return pattern.test(this.Trim());
    }
    catch(e)
	{
        return false;
    }
}

//判断字符串的真实长度(中文和全角的字符算两个字节)
String.prototype.RealLength=function()
{
    var str = this.Trim().split('');
    var length = 0;
    for(var i=0;i<str.length;i++)
	{
        length += 1;
        if(str[i].isExistSpecialChar())
		{
            length += 1;
        }
    }
    return length;
}
//判断字符长度的区域
String.prototype.RealLengthBetween=function(min,max)
{
    var len = this.Trim().RealLength();
    if(len<min || len>max)
	{
        return false;
	}
    return true;
}
//判断字符串是否含有中文或者全角的字符
String.prototype.isExistSpecialChar  =  function()
{
    return escape(this).indexOf("%u") == "-1" ? false : true;
}
//判断字符串是否为英文、数字或符号‘-’
String.prototype.CheckIfEnglish = function()
{ 
	var String=this.Trim();
	var Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-";
	var i;
	var c;
	if(String.charAt( 0 )=='-')
	{
		return false;
	}
	if( String.charAt( String.length - 1 ) == '-' )
	{
		return false;
	}
	for( i = 0; i < String.length; i ++ )
	{
		c = String.charAt( i );
		if (Letters.indexOf( c ) < 0)
		{
			return false;
		}
	}
	return true;
}

//判断字符串长度是否匹配规定
String.prototype.checkLengthMatch=function(min,max)
{
	var str=this.Trim();
	var length=str.length;
	if(length<min || max<length)
	{
		return false;
	}
	return true;
}
function checkLengthMatch(id,min,max)
{
	return $getbyid(id).value.checkLengthMatch(min,max);
}

//判断用户名是否合法
String.prototype.checkUserNameRight=function()
{
	try
	{
		var pattern=/^([a-zA-Z]+)$/
		return pattern.test(this.Trim());
	}
	catch(e)
	{
		return false;
	}
}
function checkUserNameRight(id)
{
	return $getbyid(id).value.checkUserNameRight();
}

//判断密码是否合法
String.prototype.checkPasswordRight=function(){
	try
	{
		var pattern=/[a-zA-Z0-9]/;
		return pattern.test(this.Trim());
	}
	catch(e)
	{
		return false;
	}
}
function checkPasswordRight(id)
{
	return $getbyid(id).value.checkPasswordRight();
}

//判断两次密码输入是否一致
String.prototype.confirmPassword=function(firPassword)
{
	if(firPassword!=this.Trim())
	{
		return false
	}
	return true;
}
function confirmPassword(fid,sid)
{
	return $getbyid(sid).value.confirmPassword($getbyid(fid).value.Trim());
}

//判断姓名是否合法
String.prototype.checkNameRight=function(){
	try
	{
		var pattern=/[\u4e00-\u9fa5]{2,5}|(^[a-zA-Z]+[\s.]?([a-zA-Z]+[\s.]?){0,4}[a-zA-Z]$)/;
		return pattern.test(this.Trim());
	}
	catch(e)
	{
		return false;
	}
}
function checkNameRight(id)
{
	return $getbyid(id).value.checkNameRight();
}

//判断是否包含特殊字符
function isContainSpecialChar(id){
    var tx = $getbyid(id).value;
    var pattern=/^([^`~!#$%<>@*\^?()+=\|{}\[\]\"\'\?/\\]+)$/;
	return !pattern.test(tx.Trim());
}

//判断域名是否正确
function checkDomainRight(id)
{
    var bReturn = true;
    var obj=$getbyid(id);
    
    if(obj.value.RealLength() >1024)
	{
        return false;
	}
        
    var list = obj.value.split('.');
    if(list.length < 2)
	{
        return false;
	}
     
    for(var i=0;i<list.length;i++)
	{
        if(list[i].RealLength() == 0 || list[i].RealLength()>64){
            bReturn = false;
            break;
        }
    }
    if(list[list.length-1].RealLength()>4 || list[list.length-1].RealLength()<2)
	{
        return false;
	}
        
    if(bReturn == true)
	{
        var pattern=/^([^~!#$\s%@&*^?(){}_<>,:'￥+=\"\[\];|]*)$/;
	    flag=pattern.test(obj.value.Trim());
	    if(!flag)
	    {		
		    bReturn = false;
	    }
	}        
    return bReturn;
}

//判断字符串是否为电话号码
String.prototype.checkPhone=function()
{
    try
    {
        var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/;
        return pattern.test(this.Trim());
    }
    catch(e)
    {
        return false;
    }
}
function checkPhone(id)
{
    return $getbyid(id).value.checkPhone();
}

//判断字符串是否为邮政编码
String.prototype.checkCode=function()
{
    try
    {
        var pattern = /^[1-9]{1}(\d){5}$/;
        return pattern.test(this.Trim());
    }
    catch(e)
    {
        return false;
    }
}
function checkCode(id)
{
    return $getbyid(id).value.checkCode();
}

//判断是否是IPV4
String.prototype.isIpV4 = function()
{
    try
	{
        var pattern=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
	    return pattern.test(this.Trim());
	}
	catch(e){
	    return false;
	}	
}
function checkIsIpV4(id)
{
    return $getbyid(id).value.isIpV4();
}

//设置操作结果提示
function SetActionResult(id,bDislpay,success,msg)
{
    var obj = $getbyid(id);
    obj.className = success ? "succeed" : "erro";
    obj.style.display = bDislpay ? "block" : "none";
    if(msg != null)
	{
        obj.innerHTML = "<div><span></span><p>"+msg+"</p></div>";
	}
}

//检查文件格式是否匹配
function checkImgType(id)
{    
    var filename=$getbyid(id).value;
    var allImgExt=$getbyid(id)["accept"];
    var fileExt=filename.substr(filename.lastIndexOf(".")+1).toLowerCase();    
    if(allImgExt.indexOf(","+fileExt+",")==-1)
    {
		return false;
    }
    return true;
}

//检测提示框
var chkpopFlag;
var IframeChkPopFlag;
function CheckChkPop(item,msg){
    chkpopFlag = false;
    item.focus();
    var pos = getAbsolutePos(item);
    var checkWin = document.createElement("DIV");
    checkWin.id = "autoPopChkWin";  
    if($getbyid(checkWin.id)!=null)document.body.removeChild($getbyid(checkWin.id));
    checkWin.style.position = "absolute";
    checkWin.style.zIndex = "10000";
    content = "<div class=\"outInputErro\">"
	      +"<div class=\"inputErro\">"
		  +"<div class=\"inInputErro\">"
		  +"<div class=\"pic\"></div>"
		  +msg
	      +"</div>"
		  +"<div class=\"footEdges\"></div>"
	      +"</div>"
          +"</div>"       
    checkWin.innerHTML = content;
    checkWin.style.left = pos.x + "px";    
    document.body.appendChild(checkWin);
    checkWin.style.top = pos.y - checkWin.offsetHeight-2 + "px";    
        
    document.body.onclick = function(e){
        e = e||window.event;
        var target = e.target || e.srcElement;
        var obj = $getbyid("autoPopChkWin");
        if(obj != null && chkpopFlag && target != obj && target.parentNode!= "undefined" && target.parentNode!=null && target.parentNode != obj && target.parentNode.parentNode != obj){
            document.body.removeChild(obj);          
        }        
        chkpopFlag = true;
    }
    item.onkeydown = document.body.onclick;
}
//提示文件上传错误的信息
function CheckFileIframeChkPop(item,f_x,f_y,msg){
    IframeChkPopFlag = true;
    removeFilesIframeChkPop();
    IframeChkPopFlag = false;
    var pos = getAbsolutePos(item);
    var checkWin = document.createElement("DIV");
    checkWin.id = "autoPopChkWin";  
    if($getbyid(checkWin.id)!=null)document.body.removeChild($getbyid(checkWin.id));
    checkWin.style.position = "absolute";
    checkWin.style.zIndex = "1000";
    content = "<div class=\"outInputErro\">"
	      +"<div class=\"inputErro\">"
		  +"<div class=\"inInputErro\">"
		  +"<div class=\"pic\"></div>"
		  +msg
	      +"</div>"
		  +"<div class=\"footEdges\"></div>"
	      +"</div>"
          +"</div>"       
    checkWin.innerHTML = content;
    checkWin.style.left = pos.x + f_x + "px";    
    document.body.appendChild(checkWin);
    checkWin.style.top = pos.y - checkWin.offsetHeight-2 + f_y + "px";
    document.body.onclick = removeFilesIframeChkPop;
    item.onkeydown = removeFilesIframeChkPop;
}
function removeFilesIframeChkPop(){
    try{
        var obj = $getbyid("autoPopChkWin");
        if(obj != null && IframeChkPopFlag){
            document.body.removeChild(obj);
        }    
        IframeChkPopFlag = true;
    }catch(oe){}
}
var intervalChkPop = null;
var intervalChkPop_Count = 0;
function ShowChkPop(){  
   
    if(intervalChkPop_Count==0)
        CheckChkPop($getbyid("imgClose"),"点击或按ESC键关闭窗口");
    
    intervalChkPop_Count ++;
        
    if(intervalChkPop == null){
        intervalChkPop = setInterval("ShowChkPop()",100);
    }
    if(intervalChkPop_Count==10){
        window.clearInterval(intervalChkPop);
        intervalChkPop = null;
        intervalChkPop_Count = 0;
        document.body.removeChild($getbyid("autoPopChkWin"));
    }
}


//获取标签对象位置
function getAbsolutePos(el) {
	var SL = 0, ST = 0;
	var rVal;
	if(el)
	{
		var is_div = /^div$/i.test(el.tagName);
		if (is_div && el.scrollLeft)
			SL = el.scrollLeft;
		if (is_div && el.scrollTop)
			ST = el.scrollTop;
		rVal = { x: el.offsetLeft - SL, y: el.offsetTop - ST ,w:0,h:0};
		
		var tmp = this.getAbsolutePos(el.offsetParent);
		rVal.x += tmp.x;
		rVal.y += tmp.y;
	}
	else
	{
		rVal = {x:0,y:0,w:0,h:0};
	}
	return rVal;
}
//获取标签对象位置
function getAbsolutePos2(el) {
	var SL = 0, ST = 0;
	var rVal;
	if(el)
	{
		var is_div = /^div$/i.test(el.tagName);
		if (is_div && el.scrollLeft)
			SL = el.scrollLeft;
		if (is_div && el.scrollTop)
			ST = el.scrollTop;
		rVal = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
		if (el.offsetParent&&el.offsetParent.style.position=="relative") {
			var tmp = this.getAbsolutePos(el.offsetParent);
			rVal.x += tmp.x;
			rVal.y += tmp.y;
		}
	}
	return rVal;
}
//判断是否在容器中
function CompareIsInContainer(el,container) {
    if(el==container)
        return true;
	if (el.offsetParent) {
		if(getAbsolutePos(el.offsetParent))
		    return true;		 
	}	    
	return false;
}

//判断浏览器
var Explorer = function(){
    this.Name = navigator.appName;
    this.Version = navigator.appVersion;
    try{
    if(this.Name.Trim() == "Microsoft Internet Explorer"){
       this.Version = this.Version.split('(')[1].split(';')[1].split(' ')[2];
       this.Name = "IE";
    }else{
        this.Version = this.Version.split('(')[0];
    }
    }catch(e){
        this.Name = "IE";
        this.Version = "7.0";
    }
}

//返回时间随机文件名
function GetRadomFileName(path){
    var temp = path.split('.');
    var exten = temp[temp.length-1];
    var year,month,day,hours,minutes,seconds,ap;
    var intYear,intMonth,intDay,intHours,intMinutes,intSeconds;
    var today;
    today=new Date();
    intYear=today.getYear();
    intMonth=today.getMonth()+1;
    intDay=today.getDate();
    intHours=today.getHours();
    intMinutes=today.getMinutes();
    intSeconds=today.getSeconds();
    return intYear+""+intMonth+""+intDay+""+intHours+""+intMinutes+""+intSeconds+"."+exten;
}

//返回时间随机字符串
function GetRadomString(){
    var year,month,day,hours,minutes,seconds;
    var intYear,intMonth,intDay,intHours,intMinutes,intSeconds;
    var today;
    today=new Date();
    intYear=today.getYear();
    intMonth=today.getMonth()+1;
    intDay=today.getDate();
    intHours=today.getHours();
    intMinutes=today.getMinutes();
    intSeconds=today.getSeconds();
    return intYear+""+intMonth+""+intDay+""+intHours+""+intMinutes+""+intSeconds;

}
   
/*---------------------------------------------------
// 日期格式化   
// 格式 YYYY/yyyy/YY/yy 表示年份   
// MM/M 月份      
// dd/DD/d/D 日期   
// hh/HH/h/H 时间   
// mm/m 分钟   
// ss/SS/s/S 秒
---------------------------------------------------*/
Date.prototype.Format = function(formatStr)    
{    
    var str = formatStr;      
    str=str.replace(/yyyy|YYYY/,this.getFullYear());    
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));    
   
    str=str.replace(/MM/,this.getMonth()>8?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));    
    str=str.replace(/M/g,this.getMonth());    
     
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());    
    str=str.replace(/d|D/g,this.getDate());    
   
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());    
    str=str.replace(/h|H/g,this.getHours());    
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());    
    str=str.replace(/m/g,this.getMinutes());    
   
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());    
    str=str.replace(/s|S/g,this.getSeconds());    
   
    return str;    
}    

function addFileType(filename,id)
{
    var filetype=$getbyid(id).value;
    return filename+filetype.substr(filetype.lastIndexOf(".")).toLowerCase();
}
function getFileName(id)
{
    var filename=$getbyid(id).value;
    return filename.substr(filename.lastIndexOf("\\")+1);
}

//-------重写Event支持火狐-------
function __firefox(){ 
    HTMLElement.prototype.__defineGetter__("runtimeStyle", __element_style); 
    window.constructor.prototype.__defineGetter__("event", __window_event); 
    Event.prototype.__defineGetter__("srcElement", __event_srcElement); 
} 
function __element_style(){ 
    return this.style; 
} 
function __window_event(){ 
    return __window_event_constructor(); 
} 
function __event_srcElement(){ 
    return this.target; 
} 
function __window_event_constructor(){ 
    if(document.all){ 
        return window.event; 
    } 
    var _caller = __window_event_constructor.caller; 
    while(_caller!=null){ 
        var _argument = _caller.arguments[0]; 
        if(_argument){ 
            var _temp = _argument.constructor; 
            if(_temp.toString().indexOf("Event")!=-1){ 
                return _argument; 
            } 
        } 
        _caller = _caller.caller; 
    } 
    return null; 
} 
if(window.attachEvent)
{
	
}
else if(window.addEventListener){ 
    __firefox(); 
} 
//-------重写Event支持火狐-------

document.onkeydown = function()
{
    if(event.keyCode == 27&&(parent.popwin.WinList.length>0&&parent.popwin.WinList[parent.popwin.WinList.length-1].id!="onlineEditObj"&&parent.popwin.WinList[parent.popwin.WinList.length-1].id!="SystemLoadingID")){
        parent.popwin.Close();                                        
    }
}

function CheckAll(form)
{
  for (var i=0;i<form.elements.length;i++)
  {
       var e = form.elements[i];
       if (e.name != 'chkall'&& e.name!='chkother' && e.type=="checkbox")
           e.checked = form.chkall.checked;
  }
}
function IsCheckAll(form)
{
    var count=0;
    var count1=0;
    for (var i=0;i<form.elements.length;i++)
    {
        var e = form.elements[i];
        if (e.name != 'chkall'&& e.name!='chkother'&& e.name.indexOf('rptProductItem')< 0 && e.type=="checkbox")
        {
            count1=count1+1;
            if(e.checked)
            {
                count=count+1;
            }
        }
    }
    if(count==count1)
    {
        $getbyid("chkall").checked=true;
    }else
    {
        $getbyid("chkall").checked=false;
    }
}
function checkother(form)
{
    for (var i=0;i<form.elements.length;i++)
    {
        var e = form.elements[i];
        if (e.name != 'chkall'&& e.name!='chkother' && e.type=="checkbox")
        {
            e.checked=!e.checked;
        }
    }
    IsCheckAll(form);
}
//设置Frame内容
function SetFrame(url,parametersname,parameters,text,menusort,flag){
    var href=url;
    var querystring="";
    for(var i=0;i<parametersname.length;i++)
    {
        if(i==0)
            querystring += "?";
        if(parametersname[i]==null||parameters[i]==null)
            break;
        querystring += parametersname[i] + "=" + parameters[i];
        if(i!=parametersname.length-1)
            querystring += "&";
    }
    href+=querystring;
    window.parent.Goto(href,text,window.parent.GV.menuSort[menusort],flag);
}
//设置input text属性
function SetAutoComplete(flag){
    if(flag){
        flag = "on";
    }
    else{
        flag = "off";
    }
    var inputs = document.getElementsByTagName("input");
    for(var i = 0 ;i<inputs.length;i++){
        if(inputs[i].type=="text"){
            inputs[i].setAttribute("autocomplete",flag);
        }
    }
}
//返回对象的“最终样式”属性值
function getCss(obj,css){
	return obj.currentStyle?obj.currentStyle[css]:document.defaultView.getComputedStyle(obj,false)[css];
}


function getPageSize()
{
	var winDoc=eval(document);
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY)
	{  
		xScroll = winDoc.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	}
	else if (winDoc.body.scrollHeight > winDoc.body.offsetHeight)
	{
		xScroll = winDoc.body.scrollWidth;
		yScroll = winDoc.body.scrollHeight;
	}
	else
	{
		xScroll = winDoc.body.offsetWidth;
		yScroll = winDoc.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) 
	{
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} 
	else if (winDoc.documentElement && winDoc.documentElement.clientHeight) 
	{ 
		windowWidth = winDoc.documentElement.clientWidth;
		windowHeight = winDoc.documentElement.clientHeight;
	} 
	else if (winDoc.body) 
	{ 
		windowWidth = winDoc.body.clientWidth;
		windowHeight = winDoc.body.clientHeight;
	}  
	
	//判断页面高度与窗口高度的比较
	if(yScroll < windowHeight)
	{
		pageHeight = windowHeight;
	}
	else 
	{ 
		pageHeight = yScroll;
	}
	
	if(xScroll < windowWidth)
	{  
		pageWidth = windowWidth;
	}
	else 
	{
		pageWidth = xScroll;
	}
	
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}

function getDimensions() {
	var winWidth = 0;
	var winHeight = 0;
	try {
		//获取窗口宽度
		if (window.innerWidth) {
			winWidth = window.innerWidth;
		} else if ((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth;
		}
		//获取窗口高度
		if (window.innerHeight) {
			winHeight = window.innerHeight;
		} else if ((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight;
		}
		//通过深入Document内部对body进行检测，获取窗口大小
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}
	} catch (e){}
	return winWidth + ":" + winHeight;
}

var intervalChkPop = null;
var chkpops = new Array();
var chkpopsCount = 0;
function ListenChkPop(){
    if($getbyid("framePage")==null)return;
    var divs = $getbyid("framePage").contentWindow.document.getElementsByTagName("div");
    for(var i=0;i<divs.length;i++){
        if(divs[i].className == "succeed" ||divs[i].className == "error" || divs[i].className == "erro_ok")
            chkpops[chkpops.length] = divs[i];
    }
    if(chkpops.length>0){
        chkpopsCount = 0;
        intervalChkPop=setInterval("CloseChkPops()",100);    
    }
}
function CloseChkPops(){
    if(chkpopsCount>50){        
        window.clearInterval(intervalChkPop);
        for(var i=0;i<chkpops.length;i++){
            chkpops[i].style.display = "none";
			/*
            chkpops[i].style.opacity = 1;
            chkpops[i].style.filter = "Alpha(Opacity=100)";
			*/
        }
        if($getbyid("lbMsg")!=null) $getbyid("lbMsg").style.display = "none";
        return;
    }else{
		/*
        for(var i=0;i<chkpops.length;i++){
            chkpops[i].style.opacity = 0.01;//(50.0-chkpopsCount)/50;
            chkpops[i].style.filter = "Alpha(Opacity=1)";//"Alpha(Opacity="+((50.0-chkpopsCount)*100/50)+")";
        }
		*/
        chkpopsCount ++;
    }
    
}

//列表下拉
function OpenCloseList(node,icon,id)
{   if(icon.className=="page")
		return;
	var mynode=node.parentNode.parentNode;
	var allnode=mynode.offsetParent.getElementsByTagName("tr"); 
	var index=0;
	var type=0;
	if(id>0)
	{
		type=(icon.className=="openPage"?0:1);
		GetItemID(type,id);  
	}
	for(var i=0;i<allnode.length;i++)
	{
		if(allnode[i]==mynode)
		{
			index=i;
			break;
		}
	}
	icon.className=(type==1?"openPage":"cloasePage");
	for(var i=index+1;i<=allnode.length-1;i++)
	{
		if(allnode[i].className=="tr subTr" || (allnode[i].className==''&& allnode[i+1].className!="tr"))
		{
			allnode[i].style.display=(type==0?"":"none");

		}else{
			break;
		}
	}
	
   parent.popwin.SetDocHeight();
}

function GetItemID(type,id)
{
    id=id+",";
    if(type==0)
    {
        if($getbyid("txtID").value.indexOf(id)<0)
            $getbyid("txtID").value +=id;
    }else
    {
        $getbyid("txtID").value=$getbyid("txtID").value.replace(id,"");
    }
}
function OpenParentTR()
{
	var str=$getbyid("txtID").value;
	if(str!='')
	{
	   var inputlist=document.getElementsByName('hideInput');
	   str=str.substr(0,str.length-1);
	   str=str.split(',');
	   for(var t=0;t<inputlist.length;t++)
	   {        
		   for(var l=0;l<str.length;l++)
			{
				if(inputlist[t].value.Trim()==str[l])
				{
					
					OpenCloseList(inputlist[t],inputlist[t].parentNode.getElementsByTagName("a")[0],0);
				 }
			}
		}
	}
}


function ChkRichLength(iframe,min,max)
{
    var iframebody=iframe.contentWindow.document.body;
        
    var richvalue=iframebody.innerHTML;
    if((richvalue==null || richvalue=="undifined"))
        return false;
    if(richvalue=="<br>")
        return false;
    if(richvalue.RealLength()<min)
        return false;
    if(richvalue.RealLength()>max){
        richvalue=(iframebody.innerText?iframebody.innerText:iframebody.textContent);
        if(richvalue.RealLength()>max)
            return false;
    }    
    return true;
}

function CreateKeyDown(btn){
    document.onkeydown=function() {         
        if(event.keyCode==13)
		{     
            $getbyid(btn).click();     
            return false;     
        }     
     } 
}