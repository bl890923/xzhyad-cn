var WebPopWin = function(){
    
    //窗体列表变量
    this.WinList = new Array();
    //事件变量
    this.Evt = null;
    //计时器变量
    this.Interval =null;
    //数据加载完成变量
    this.Complete = false;
    //蒙版对象变量
    this.MarkWin = null;
    //数据加载条变量
    this.DataLoadingBar = null;
	//配置蒙版层的颜色变量
	this.TheMaskBg = 0;
	
	this.isEditManage = false;


    //系统初始化------------------------------------------------------------------------------
    this.Loaded = 0;
    this.SystemLoading = function(){   
        this.Complete = false;
        this.Mark(true);
        var conWin = this.GetWinBox();
        conWin.id = "SystemLoadingID";
        
        var curr = document.createElement("div");
        curr.className = "inDiv";
        curr.innerHTML = "<div class=\"loadCon\">"
                        +"<div class=\"progress\">"
                        +"<div class=\"line\" style=\"width:1%\" id=\"loadingBar\"></div>"
                        +"</div>"
                        +"<div class=\"percent\" id=\"loadingText\">1%</div>"
                        +"<div class=\"refresh\">[<a href=\"javascript:void(0);\" onclick=\"window.location.reload()\">刷新</a>]</div>"
                        +"</div>";
        
        //alert(conWin.firstChild.className);
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(curr);
		conWin.firstChild.firstChild.nextSibling.appendChild(curr);
        document.body.appendChild(conWin);
        this.Resize(conWin);   
        this.WinList[this.WinList.length] = conWin;
		//设置进度信息
		this.Interval = setInterval("popwin.SetLoadingBar()",50);
    }
    //系统加载完成
    this.SystemLoaded = function(){
        this.SetLoadingInfo(90);
        window.clearInterval(this.Interval);
        this.Interval = null;
        this.Interval = setInterval("parent.popwin.SetLoadingBar()",1);            
    }
    //系统重新加载
    this.ResetSystemLoading = function(){
        window.clearInterval(this.Interval);
        this.Interval = null;
        this.Loaded = 0;
    }
    //设置进度条
    this.SetLoadingInfo = function(percent){
        var objBar = $getbyid("loadingBar");
        var objText = $getbyid("loadingText");
        if(objBar != null && objText != null){
            objBar.style.width = percent + "%";
            objText.innerHTML = percent + "%";
        }
    }
    this.pageIsLoad = false;
    this.SetLoadingBar = function(){
        if(this.Complete==false && this.Loaded<90)
            this.Loaded += 1;
        if(this.Complete)
            this.Loaded += 8;
          
        if(!this.pageIsLoad&&this.Complete){            
            this.SystemLoaded();  
            this.pageIsLoad = true;
        }
        if(this.Loaded%8==0)
            this.SetLoadingInfo(this.Loaded);
        if(this.Loaded>100)
        {      
            this.SetLoadingInfo(100);    
            defaultPage = false;  
            //加载完毕
            window.clearInterval(this.Interval);
            this.Interval = null;
            this.Loaded = 0;
            this.Close();             
        }        
    }


    //页面加载------------------------------------------------------------------------------
    this.Goto = function(url){  
        //this.Mark(true);
               
        popwin.Complete = false;        
        var urlID = url.substring(0,url.indexOf('.'));
        
        if($getbyid("frame_main")==null||$getbyid("frame_main").contentWindow==null||$getbyid("frame_main").contentWindow=="undefined") parent.window.location = url;
        else{
            if(ChkFeature(urlID)){
                if(!defaultPage) this.DataLoading("页面加载中..."); 
                $getbyid("frame_main").style.height = $getbyid("inBody").style.height = "500px";
                try{
                    divHeight();
                }catch(e){}
                $getbyid("frame_main").src = url;
            }        
        }
    }
    this.pageHeight = 0;
    this.PageLoaded = function(h){
        if(h!=null) this.pageHeight = h;
        this.CloseDataLoading();        
    }


    //监测页面数据更新------------------------------------------------------------------------------
    this.loadingDiv = null;
    this.SubPageResize = function(item){    
        if(this.Interval!=null) window.clearInterval(this.Interval);
        this.pageHeight = 0;
        if(item!=null&&item!="undefined"){
            this.DataLoading();
            this.loadingDiv = item;
            parent.Edited = true;
            this.Interval = setInterval("popwin.SetPageWH()",300);
        }
    }
    this.SetPageWH =function(){
        if(this.loadingDiv!=null&&this.loadingDiv.style.display == "none"){
            var iframe = null;
            try{
                //iframe = this.WinList[this.WinList.length-1].firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild;
				iframe = this.WinList[this.WinList.length-1].firstChild.firstChild.nextSibling.firstChild;
            }catch(e){}
            if(iframe!=null&&iframe!="undefined"&&iframe.contentWindow.$!=null&&iframe.contentWindow.$!="undefined"&&iframe.contentWindow.$getbyid(this.loadingDiv.id)!=null&&iframe.contentWindow.$getbyid(this.loadingDiv.id)!="undefined"){
                var cls = iframe.contentWindow.$getbyid(this.loadingDiv.id).className;
                if(cls == "erro_ok"|| cls == "erro"){
                      window.clearInterval(this.Interval);
                     this.CloseDataLoading();
                     this.SetWinWH();
                 }else{
                    window.clearInterval(this.Interval);            
                    this.Interval = null;  
                    this.loadingDiv = null;
                    if(this.WinList.length==0||(this.WinList.length>0&&this.WinList[this.WinList.length-1].id!="onlineEditObj"))
                        this.Close();
                 }
            }else{
                window.clearInterval(this.Interval);            
                this.Interval = null;  
                this.loadingDiv = null;
                if(this.WinList.length==0||(this.WinList.length>0&&this.WinList[this.WinList.length-1].id!="onlineEditObj"))
                    this.Close();
            }
            try{
                ListenChkPop();
            }catch(e){}
        }
    }

    
    //数据加载条对象
    this.DataLoading = function(loadingTxt){
        if(loadingTxt == null) loadingTxt = "数据正在加载中...";
        if(this.DataLoadingBar == null){
            this.DataLoadingBar = document.createElement("div");
            this.DataLoadingBar.className = "loadding";
            this.DataLoadingBar.innerHTML = "<div>"+loadingTxt+"</div>";
            this.DataLoadingBar.id = "winLoadingBar";
            //this.DataLoadingBar.style.right = "50px";
            //this.DataLoadingBar.style.top = "50px";
			this.DataLoadingBar.style.left = "45%";
			this.DataLoadingBar.style.top = "50%";
            this.DataLoadingBar.style.position = "absolute";
            this.DataLoadingBar.style.zIndex = 1000;
            document.body.appendChild(this.DataLoadingBar);
        }
    }
    
    
    //蒙版半透明对象
    this.Mark = function(display){
        if(display){
            this.SetDropList(false);
            if(this.MarkWin!=null){
                if(parent.$getbyid("onlineEditObj")!=null){
                    this.MarkWin.style.zIndex = parseInt(parent.$getbyid("onlineEditObj").style.zIndex) + 1;            
                }
                return;
            }
            var mask_obj=document.createElement("Div");            
            mask_obj.className = "pop2mask";           
            mask_obj.style.position = "absolute"; 
            mask_obj.style.left = "0px";
            mask_obj.style.top = "0px";
            mask_obj.style.width = "100%";
            mask_obj.style.height = getPageSize()[1] + "px";
            mask_obj.style.zIndex = "1000";
			if(this.TheMaskBg==1)
			{
				mask_obj.style.backgroundColor = "#666";
			}
			else
			{
				//编辑top窗体的引用背景
            	mask_obj.style.backgroundColor = "#606060";
				//mask_obj.style.backgroundColor = "#fff";
			}
            mask_obj.style.opacity = 0.4;
            mask_obj.style.filter = "Alpha(Opacity=40)";
            document.body.appendChild(mask_obj);
            var mask_height = getPageSize()[1];
            if(mask_height>mask_obj.offsetHeight)
			{
                mask_obj.style.height = mask_height + "px";
			}
            this.MarkWin = mask_obj;
        }
		else if(this.MarkWin!=null){
            if(parent.$getbyid("onlineEditObj")!=null){
				/*
                try{
                    this.MarkWin.style.zIndex = parseInt(parent.$getbyid("onlineEditObj").style.zIndex) - 1;
                }catch(e){
                    document.body.removeChild(this.MarkWin);
                    this.MarkWin = null;
                }
				*/
				document.body.removeChild(this.MarkWin);
				this.MarkWin = null;
            }else{
                document.body.removeChild(this.MarkWin);
                this.MarkWin = null;
                this.SetDropList(true);
            }
        }
    }
    this.SetDropList = function(display){
        if($getbyid("frame_main")==null)return;
        var list = $getbyid("frame_main").contentWindow.document.getElementsByTagName("select");
        for(var i=0;i<list.length;i++){
            list[i].style.display = display?"":"none";
        }
    }
    
    
    //获取窗体框容器
    this.GetWinBoxFrame = function(){
        var conWin = document.createElement("div");
		if(this.MarkWin)
		{
			conWin.style.zIndex = parseInt(this.MarkWin.style.zIndex)+1;
		}
		else
		{
			conWin.style.zIndex = 1001;
		}
        conWin.className = "pop2load";
        var mainLoad = document.createElement("div");
        mainLoad.className = "mainLoad";
        conWin.appendChild(mainLoad);
        return conWin;
    }
	//取得弹出编辑窗口的HTML标签
    this.GetWinBox = function(){
        var conWin = this.GetWinBoxFrame();
        //conWin.firstChild.innerHTML = "<div class=\"loadHead\"><div><div><div class=\"loadLogo\"></div><div class=\"close\" title=\"关闭\" style=\"display:none;\" onclick=\"popwin.Close()\" ></div></div></div></div><div class=\"outCon\"><div class=\"outConLeft\"><div class=\"outConRight\"></div></div></div><div class=\"loadFoot\"><div><div></div></div></div>";
		
		var popEditHtml="<div class=\"loadHead\">";
		popEditHtml=popEditHtml + "<div class=\"loadLogo\"></div>";
		popEditHtml=popEditHtml + "<div class=\"close\" title=\"关闭返回\" style=\"display:;\" onclick=\"popwin.Close()\" >关闭</div>";
		popEditHtml=popEditHtml + "</div>";
		
		popEditHtml=popEditHtml + "<div class=\"popFrameMain\"></div>";
		
		conWin.firstChild.innerHTML = popEditHtml;
        return conWin;
    }

    
    //退出窗体------------------------------------------------------------------------------
    this.Quit = function(){
        this.Mark(true);
        var conWin = this.GetWinBox();
        
        var curr = document.createElement("div");
        curr.className = "inDiv";
        curr.innerHTML = " 您要退出网站后台管理吗？"
                        +"<div class=\"btnLoad\">"
                        +"<input type=\"button\" value=\"确定\" id=\"btnSure\" onclick=\"popwin.Close();popwin.Goto('admins_login.asp?action=relog');\" class=\"btn\" />　"
                        +"<input type=\"button\" value=\"取消\" id=\"btnCancel\" onclick=\"popwin.Close()\" class=\"btnCancel\" />"
                        +"</div>";
        
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(curr);
		conWin.firstChild.firstChild.nextSibling.appendChild(curr);
        document.body.appendChild(conWin);
        
        //绑定退出事件
        $getbyid("btnSure").focus();
        this.Resize(conWin);   
        this.WinList[this.WinList.length] = conWin;
    }

    
    //提示窗体------------------------------------------------------------------------------
    this.Alert = function(tl,tx,fun){
        this.Mark(true);
        var conWin = this.GetWinBox();
        //var winTitle = conWin.firstChild.firstChild.firstChild.firstChild.firstChild;
		var winTitle = conWin.firstChild.firstChild.firstChild;
        winTitle.className = "loadTitle";
        winTitle.innerHTML = "<img src=\"images/remind.gif\" />"+tl;
        winTitle.nextSibling.style.display = "";
        var curr = document.createElement("div");
        curr.className = "Con";
        curr.innerHTML = " "+tx
                        +"<div class=\"btnLoad\">"
                        +"<input type=\"button\" value=\"确定\" id=\"btnSure\" onclick=\"popwin.Close();popwin.Goto('admins_login.asp?action=relog');\" class=\"btn\" />　"
                        +"</div>";
        
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(curr);
        conWin.firstChild.firstChild.nextSibling.appendChild(curr);
        document.body.appendChild(conWin);
        this.SetMove();
               
        //绑定退出事件
        $getbyid("btnSure").onclick = function(){
            popwin.Close();
            if(fun != null) fun();
        }              
        $getbyid("btnSure").focus();
        this.Resize(conWin);   
        this.WinList[this.WinList.length] = conWin;
        this.SetMove();
    }

    
    //确认窗体------------------------------------------------------------------------------
    this.isStop = true;
    this.Confirm = function(tl,tx,item,type){
        if(!this.isStop)
            return true;
            
        var icon = "images/remind.gif";
        if(type!=null&&type!="undefined") icon = "images/warning.gif";
            
        this.Mark(true);
        var conWin = this.GetWinBox();
        //var winTitle = conWin.firstChild.firstChild.firstChild.firstChild.firstChild;
		var winTitle = conWin.firstChild.firstChild.firstChild;
        winTitle.className = "loadTitle";
        winTitle.innerHTML = "<img src=\"images/"+icon+"\" />"+tl;
        winTitle.nextSibling.style.display = "";
        
        var curr = document.createElement("div");
        curr.className = "Con";
        curr.innerHTML = " "+tx
                        +"<div class=\"btnLoad\">"
                        +"<input type=\"button\" value=\"确定\" id=\"btnSure\" onclick=\"popwin.Close();popwin.Goto('admins_login.asp?action=relog');\" class=\"btn\" />　"
                        +"<input type=\"button\" value=\"取消\" id=\"btnCancel\" onclick=\"popwin.Close()\" class=\"btnCancel\" />"
                        +"</div>";
        
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(curr);
        conWin.firstChild.firstChild.nextSibling.appendChild(curr);
        document.body.appendChild(conWin);
                
        this.Resize(conWin);   
        this.WinList[this.WinList.length] = conWin;
        this.SetMove();
        
        //绑定退出事件
        $getbyid("btnSure").focus();
        $getbyid("btnSure").onclick = function(){
            popwin.Close();
            popwin.isStop = false;
            if(typeof(item)=="function"){
                item();
            }else{
                item.click();
                if(popwin.Evt == null) 
                    popwin.SubPageResize($getbyid("frame_main").contentWindow.document.getElementById("LoadProgressing"));
                else
                    popwin.Evt();  
                popwin.isStop = true;    
            }      
        }
        $getbyid("btnCancel").onclick = function(){
            popwin.Close();
        }
        
        return false;
    }


    //超时信息框------------------------------------------------------------------------------
    this.OutTimer = function(url){
        if(!this.isStop)
            return true;
            
        this.Mark(true);
        var conWin = this.GetWinBox();
        //var winTitle = conWin.firstChild.firstChild.firstChild.firstChild.firstChild;
		var winTitle = conWin.firstChild.firstChild.firstChild;
        winTitle.style.display = "none";
        
        var curr = document.createElement("div");
        curr.className = "Con";
        curr.innerHTML ="<div class=\"reLogin\"><span></span>"
	                        +"<h3>您好，登录已超时。</h3>"
	                        +"<p>由于您长时间没有进行页面操作，为了您的系统安全，请<a href=\"#\" onclick=\"parent.window.location.href='"+url+"'\">重新登录</a>。</p>"
	                        +"<div class=\"clear\"></div>"
	                        +"</div>";
        
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(curr);
        conWin.firstChild.firstChild.nextSibling.appendChild(curr);
        document.body.appendChild(conWin);
        conWin.firstChild.style.width = 500 + "px";
        this.Resize(conWin);   
        this.WinList[this.WinList.length] = conWin;
        return false;
    }
    
    
    //信息确认框------------------------------------------------------------------------------
    this.WinViewer = function(tl,html,item,btnSureName,btnCancelName){
        if(!this.isStop)
            return true;
            
        this.Mark(true);
        var conWin = this.GetWinBox();
        //var winTitle = conWin.firstChild.firstChild.firstChild.firstChild.firstChild;
		var winTitle = conWin.firstChild.firstChild.firstChild;
        winTitle.className = "loadTitle";
        winTitle.innerHTML = "<img src=\"images/remind.gif\" />"+tl;
        winTitle.nextSibling.style.display = "";
        
        var curr = document.createElement("div");
        curr.className = "Con";
        curr.innerHTML = html
                        +"<div class=\"btnLoad\" style='padding-bottom:1px;'>"
                        +"<input type=\"button\" value=\"确定\" id=\"btnSure\" onclick=\"popwin.Close();popwin.Goto('admins_login.asp?action=relog');\" class=\"btnThree\" />　"
                        +"<input type=\"button\" value=\"取消\" id=\"btnCancel\" onclick=\"popwin.Close()\" class=\"cancel\" />"
                        +"</div>";
        
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(curr);
        conWin.firstChild.firstChild.nextSibling.appendChild(curr);
        document.body.appendChild(conWin);
        conWin.firstChild.style.width = 500 + "px";
        this.Resize(conWin);   
        this.WinList[this.WinList.length] = conWin;
        this.SetMove();
        
        //绑定退出事件
        $getbyid("btnSure").focus();
        if(btnSureName!=null&&btnSureName!="undefined")
        {
            $getbyid("btnSure").value=btnSureName;
        }
        if(btnCancelName!=null&&btnCancelName!="undefined")
        {
            $getbyid("btnCancel").value=btnCancelName;
        }
        $getbyid("btnSure").onclick = function(){            
            popwin.isStop = false;
            if(typeof(item)=="function"){
                item();
            }else{
                popwin.Close();
                try{
                    item.onclick = function(){return true;}
                    item.click();                    
                }catch(e){
                    //$getbyid("frame_main").contentWindow.__doPostBack(item.id,'');
                }
                if(popwin.Evt == null) 
                    popwin.SubPageResize($getbyid("frame_main").contentWindow.document.getElementById("LoadProgressing"));
                else
                    popwin.Evt();  
            }
            popwin.isStop = true;          
        }
        $getbyid("btnCancel").onclick = function(){
            popwin.Close();
        }
        
        return false;
    }

    
    //编辑框------------------------------------------------------------------------------
    this.winPageId = "SetWindowID";
    this.WinEditor = function(theTit,theW,theH,url,fun,type){
        if(fun!=null) this.Evt = fun;
		this.TheMaskBg=1;	//显示蒙版层背景的参数
		this.isEditManage=true;
        this.Mark(true);
        this.DataLoading("页面正在加载中...");
        var conWin = this.GetWinBox();
        //var winTitle = conWin.firstChild.firstChild.firstChild.firstChild.firstChild;
		var winTitle = conWin.firstChild.firstChild.firstChild;
        winTitle.className = "loadTitle";
        winTitle.innerHTML = "<img src=\"" + this.SetWinIcon() + "\" />"+theTit;
        //winTitle.nextSibling.style.display = "";
        //子页面的Iframe对象
        var newIframe = document.createElement("iframe");
        newIframe.scrolling = "auto";
        newIframe.frameBorder = "0";
        newIframe.src = url;
        newIframe.style.width = "100%";
		
		newIframe.id="editIframeObj";
		newIframe.name="editIframeObj";
        
        //conWin.firstChild.firstChild.nextSibling.firstChild.firstChild.appendChild(newIframe);
        conWin.firstChild.firstChild.nextSibling.appendChild(newIframe);
        document.body.appendChild(conWin);
        this.WinList[this.WinList.length] = conWin;
		
		this.SetWinWH(theW,theH);
        
        this.Resize(conWin);
        this.DataLoadingBar.style.right = "50%";
        this.DataLoadingBar.style.top = parseInt(conWin.style.top)+conWin.offsetHeight/2+"px";
        //this.SetMove();
		popwin.CloseDataLoading();
    }
    this.SetWinWH = function(theW,theH){
        if(this.WinList.length==0||this.WinList[this.WinList.length - 1].id == "onlineEditObj") return;
        var currWin = this.WinList[this.WinList.length - 1];
        //var iframe = currWin.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild;
		var iframe = currWin.firstChild.firstChild.nextSibling.firstChild;
        if(iframe==null||iframe=="undefined"||iframe.tagName.toLowerCase()!="iframe")
		{
            return;
		}
		
        try{
			currWin.style.width = getPageSize()[0]-2 + "px";
			currWin.firstChild.style.width = "100%";
			
			//iframe.style.height = getPageSize()[1]-33 + "px";
			iframe.style.height = getPageSize()[1]-32 + "px";
        }
		catch(e){
			currWin.firstChild.style.width = theW + "px";
			iframe.style.height = theH + "px";
		}
		//更新子IFrame的自适应高度
		//restoreViewState("editIframeObj",null);
    }

    
    //返回设置的窗体图标
    this.SetWinIcon = function(){
		var icon_path="/onlinecss/images/";
        var icon_file = icon_path + "images/module_edit.gif";
        return icon_file;
    }

    
    //重新对窗体定位操作
    this.Resize = function(objWin){
		/*
        var scrollPosTop; 
        var scrollPosLeft; 
        if (typeof window.pageYOffset != 'undefined') { 
           scrollPosTop = window.pageYOffset; 
           scrollPosLeft = window.pageXOffset; 
        }
        else if (typeof document.body != 'undefined') { 
           scrollPosTop = document.body.scrollTop; 
           scrollPosLeft = document.body.scrollLeft;
        }
        else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { 
           scrollPosTop = document.documentElement.scrollTop; 
           scrollPosLeft = document.documentElement.scrollLeft; 
        }
		*/
		var scrollPosTop = window.pageYOffset || parent.document.documentElement.scrollTop || parent.document.body.scrollTop || 0;
		var scrollPosLeft = window.pageXOffset || parent.document.documentElement.scrollLeft || parent.document.body.scrollLeft || 0;
        
        //var winSize = getDimensions().split(':');
		var winSize = getPageSize();
        var winWidth = winSize[0];
        var winHeight = winSize[1];
        
        try{
			objWin.style.top = "0px";
			objWin.style.left = "0px";
			
			/* ----根据滚动条的位置定位新层----
            objWin.style.top = (scrollPosTop + (winHeight - objWin.offsetHeight)/2) + "px";
            objWin.style.left = (scrollPosLeft + (winWidth - objWin.offsetWidth)/2) + "px";
			
            var temp = parseInt(objWin.style.top) + objWin.offsetHeight - scrollPosTop - winHeight;
            //if(temp>0)
			if(temp!=0)
			{
                objWin.style.top = scrollPosTop + 20 + "px";
			}
            
            if(parseInt(objWin.style.top)<scrollPosTop)
			{
                objWin.style.top = (scrollPosTop + 20) + "px";
			}
			*/
        }catch(e){
			objWin.style.left = "0px";
			objWin.style.top = "0px";
		}
    }

    
    //移动窗体管理操作
    this.SetMove = function(){
		/*
        if(this.WinList.length==0) return;
        var conWin = this.WinList[this.WinList.length-1];
        if(conWin&&conWin.firstChild&&conWin.firstChild.firstChild){
            loadHead = conWin.firstChild.firstChild;
            loadHead.onmousedown = function(){fDragging(conWin, event, true);}
            loadHead.onmouseover = function(){loadHead.style.cursor = "move";}
            loadHead.onmouseup = function(){loadHead.style.cursor = "default";}
        }
		*/
    }
    this.Close = function(is_reload){        
        this.Complete = true;
        try{
            if(defaultPage) this.SetLoadingInfo(100);
        }catch(e){}
        this.SetWinWH();
        if(this.WinList.length>0)
            document.body.removeChild(this.WinList[this.WinList.length-1]);
        try{
            $getbyid("form1").style.display = "";
            $getbyid("footer").style.display = "";
        }catch(e){}
        if(this.WinList.length==1){
            this.WinList = new Array();
        }else{                
            var temp = new Array();
            for(var i=0;i<this.WinList.length-1;i++){
                temp[i] = this.WinList[i];
            }
            this.WinList = temp;               
        }
        this.CloseDataLoading();
        this.ExecEv();
        if(this.WinList.length==0||this.WinList[this.WinList.length - 1].id == "onlineEditObj")
            this.Mark(false);
        
        var objChk = $getbyid("autoPopChkWin");
        if(objChk!=null)
            document.body.removeChild(objChk);
		
		//配置在线编辑模块的管理页面引用的参数
		setTheCookie("editPopManage",0,1);
		//让客户端与服务端的Cookies同步
		var ajaxPostUrl="/admin/onlineedit/set_editjscookies.asp";
		var theAjaxObj = new Ajax('statusid', 'HTML');
		theAjaxObj.post(ajaxPostUrl,"editPopManage=0",function(s){});
		
		this.isEditManage = false;
		if(is_reload)
		{
			document.location.reload();
		}
    }
    this.CloseDataLoading = function(){       
        this.Complete = true;
        this.isStop = true;        
        if(this.DataLoadingBar){
            document.body.removeChild(this.DataLoadingBar);
            this.DataLoadingBar = null;            
        }                
        this.SetIframeHeight(); 
        //this.SetMove();       
    }
    this.ExecEv = function(){
        if(this.Evt!=null){
            if(parent.Edited)
            {
                this.Evt();
                parent.Edited = false;
            }
            this.Evt = null;
        }
    }
    this.SetIframeHeight = function(){
        //判断是否打开编辑窗体
        var stanH = 500;
        if(this.WinList.length == 0)
            this.Mark(false);
        
        //设置高度
        this.SetDocHeight();
    }
    this.SetDocHeight = function(){
        //设置系统高度
        var objFrame = $getbyid("frame_main");    
        
        if(objFrame==null||objFrame.id=="undefined"||objFrame.id==null) return;
        
        try{
            if(objFrame.contentWindow.document.forms.length==0)
                this.pageHeight = objFrame.contentWindow.getPageSize()[1];
            else
                this.pageHeight = objFrame.contentWindow.document.forms[0].offsetHeight + 30;
        }catch(e){}
            
        if(this.pageHeight<550) this.pageHeight = 550;
        objFrame.style.width = "100%";
	    //objFrame.style.height = $getbyid("inBody").style.height = this.pageHeight + "px";
		objFrame.style.height = this.pageHeight + "px";
	    try{	        
            divHeight();
        }catch(e){}        
    }
}

//更新子IFrame的自适应高度
function restoreViewState(iFrame_Id,parentObj)
{
	/* ------重新设置弹出窗体的IFrame高度------ */
	var newWidth,newHeight,iFrame_Obj;
	if(parentObj)
	{
		iFrame_Obj=parentObj.getElementById(iFrame_Id);
	}
	else
	{
		iFrame_Obj=document.getElementById(iFrame_Id);
	}
	
	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
	var theAddTop = 0;
	if (iFrame_Obj.Document){
		//用于IE浏览器
		if(iFrame_Obj.readyState=="complete")
		{
			//alert(iFrame_Obj.Document.body.scrollHeight);
			newHeight = iFrame_Obj.Document.body.scrollHeight || iFrame_Obj.Document.body.offsetHeight;
			//newHeight = 0;	//该参数设置是针对top窗体无滚动条时
			newWidth = iFrame_Obj.Document.body.scrollWidth || iFrame_Obj.Document.body.offsetWidth;
			
			//重新设置窗体对象的宽高大小值
			if(parentObj)
			{
				windowHeight = parentObj.documentElement.clientHeight || parentObj.body.clientHeight || 0;
			}
			if(newHeight < windowHeight)
			{
				newHeight=windowHeight;
				theAddTop=33;
			}
			newHeight=newHeight + 8;	//特意给框架增加8像素的高度
			if(parentObj)
			{
				var markHeight = newHeight + parseInt(parent.$getbyid(parent.onlineEditObj).style.top) + 33;
				parent.popwin.MarkWin.style.height = markHeight - theAddTop  + "px";
				
				//判断屏幕小于网页的实际大小时的处理
				if(parent.popwin.MarkWin.offsetWidth<newWidth)
				{
					//判断滚动条的宽是否已经计算在内（对于IE8的计算判断）
					if(newWidth-parent.popwin.MarkWin.offsetWidth!=16)
					{
						parent.popwin.MarkWin.style.width = newWidth  + "px";
					}
				}
				if(iFrame_Obj.offsetWidth<newWidth)
				{
					//判断滚动条的宽是否已经计算在内（对于IE8的计算判断）
					if(newWidth-iFrame_Obj.offsetWidth!=16)
					{
						iFrame_Obj.style.width = newWidth  + "px";
					}
				}
			}
			iFrame_Obj.style.height = newHeight - theAddTop + "px";
		}
		else
		{
			//对于IE6时,可能会有脚本错误提示
			//setTimeout("restoreViewState('" + iFrame_Id + "'," + parentObj + ")",10);
		}
	}else{
		/*
		//用于非IE浏览器
		iFrame_Obj.onload=function(){
			var theIframe=iFrame_Obj.contentWindow || iFrame_Obj.contentDocument;
			//alert(theIframe.document.body.scrollHeight);
			newHeight = theIframe.document.body.scrollHeight || theIframe.document.body.offsetHeight;
			//newHeight = 0;	//该参数设置是针对top窗体无滚动条时
			//newWidth = theIframe.document.body.scrollWidth || theIframe.document.body.offsetWidth;
			
			//重新设置窗体对象的宽高大小值
			if(parentObj)
			{
				windowHeight = parentObj.documentElement.clientHeight || parentObj.body.clientHeight || 0;
				
			}
			if(newHeight < windowHeight)
			{
				newHeight=windowHeight;
				theAddTop=33;
			}
			newHeight=newHeight + 8;	//特意给框架增加8像素的高度
			if(parentObj)
			{
				var markHeight = newHeight + parseInt(parent.$getbyid(parent.onlineEditObj).style.top) + 33;
				parent.popwin.MarkWin.style.height = markHeight - theAddTop  + "px";
				
				//判断屏幕小于网页的实际大小时的处理
				if(parent.popwin.MarkWin.offsetWidth<newWidth)
				{
					parent.popwin.MarkWin.style.width = newWidth  + "px";
				}
				if(iFrame_Obj.offsetWidth<newWidth)
				{
					iFrame_Obj.style.width = newWidth  + "px";
				}
				*/
				/*
			}
			iFrame_Obj.style.height = newHeight - theAddTop + "px";
		}
		*/
	}	
}

/* ----底部位置控制---- */
function divHeight(){
	var bodyH = document.getElementById("container");
	bodyH.style.height = "500px";
	var mainH = document.getElementById("inContainer");
	bh = document.body.clientHeight;
	mh = mainH.offsetHeight;
	if(mh>bh){
		bodyH.style.height = mh + "px";
		}
	else{
		bodyH.style.height = bh + "px";
		}
	}
	
function fDragging(obj, e, limit){ 
        if(!e) e=window.event; 
        var x=parseInt(obj.style.left); 
        var y=parseInt(obj.style.top); 
         
        var x_=e.clientX-x; 
        var y_=e.clientY-y; 
         
        if(document.addEventListener){ 
            document.addEventListener('mousemove', inFmove, true); 
            document.addEventListener('mouseup', inFup, true); 
        } else if(document.attachEvent){ 
            document.attachEvent('onmousemove', inFmove); 
            document.attachEvent('onmouseup', inFup); 
        } 
         
        inFstop(e);     
        inFabort(e) 
         
        function inFmove(e){ 
            var evt; 
            if(!e)e=window.event;  
            if(false){            
                //横向拖拉限制
                if((e.clientX-x_-obj.offsetWidth/2)<=0)
                    return false;
                if((e.clientX-x_+obj.offsetWidth/2+1)>=document.body.scrollWidth)
                    return false;
                //纵向拖拉限制
                if((e.clientY-y_-obj.offsetHeight-document.documentElement.scrollTop)<=0)
                    return false;
                if((e.clientY-y_ -document.documentElement.scrollTop) >= document.body.clientHeight)
                    return false;
            } 
             
            obj.style.left=(e.clientX-x_)+'px'; 
            obj.style.top=(e.clientY-y_)+'px';
            inFstop(e); 
        }
		
        function inFup(e){ 
            var evt; 
            if(!e)e=window.event; 
             
            if(document.removeEventListener){ 
                document.removeEventListener('mousemove', inFmove, true); 
                document.removeEventListener('mouseup', inFup, true); 
            } else if(document.detachEvent){ 
                document.detachEvent('onmousemove', inFmove); 
                document.detachEvent('onmouseup', inFup); 
            } 
             
            inFstop(e); 
        }
  
        function inFstop(e){ 
            if(e.stopPropagation) return e.stopPropagation(); 
            else return e.cancelBubble=true;             
        }
		
        function inFabort(e){ 
            if(e.preventDefault) return e.preventDefault(); 
            else return e.returnValue=false; 
        }
    }