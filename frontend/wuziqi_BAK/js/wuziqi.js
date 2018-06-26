//标志位，用来判断该下黑棋还是白棋
var flag = true;
window.onload = function(){
	//创建一个15X15的棋盘
	createBoard(15,15);
	
	
	var height = window.innerHeight;
	var width = window.innerWidth;
	var sheet = document.styleSheets[1];
	
	
	//alert(height);
	//alert(document.body.scrollTop);
	var styleElement = document.createElement('style');
	if(width>=height){
		//table.style.width = height+"px";
		//table.style.height = height+"px";
		styleElement.innerHTML = ".td{width:"+parseInt(height/16)+"px;height:"+parseInt(height/16)+"px;}";
		document.head.insertAdjacentElement('afterbegin',styleElement);
		// sheet.insertRule(,0);
		//sheet.insertRule("#table{margin: 0 auto;}",0);
	}
	else{
		//table.style.width = width+"px";
		//table.style.height = width+"px";
		// sheet.insertRule(".td{width:"+parseInt(width/16)+"px;height:"+parseInt(width/16)+"px;}",0);
		styleElement.innerHTML = ".td{width:"+parseInt(width/16)+"px;height:"+parseInt(width/16)+"px;}";
		document.head.insertAdjacentElement('afterbegin',styleElement);
		//sheet.insertRule("#table{margin: 0 auto;}",0);
	}
	
	
	//alert(window.getComputedStyle(tbody,null).height);
	//为每个td对象注册点击事件
	for (var i = 0; i < tbody.children.length; i++) {
		
		for (var j = 0; j < tbody.children[i].children.length; j++) {
			//这种写法为了靠近二维数组
			tbody.children[i].children[j].index_row = i;
			tbody.children[i].children[j].index_col = j;
			//判断触屏事件是否存在，存在为null，注册touchend事件，否则为undefined，注册mousedown事件
			if(tbody.children[i].children[j].ontouchend===undefined){
				tbody.children[i].children[j].addEventListener("mousedown",playChess,false);
				
				
			}
			else{
				tbody.children[i].children[j].addEventListener("touchend",playChess,false);
			}
			//阻止棋盘上的滑动事件,依然有一些bug
			tbody.children[i].children[j].onmousemove = function(e){
					e.preventDefault();
					
					
			}
			tbody.children[i].children[j].ontouchmove = function(e){
				e.preventDefault();
			}
			
		}
	}
	

}

//胜利条件判断
function victory(row,col){
	//当前节点所在的行对象的所有子对象
	

	for (var i = -4; i <=0; i++) {
	
		try{
			//横向判断，每一个有作为五子开始，中间，结束的可能，总共有五种情况，下同
			if (tbody.children[row].children[col+i].flag*tbody.children[row].children[col+i+1].flag*tbody.children[row].children[col+i+2].flag*tbody.children[row].children[col+i+3].flag*tbody.children[row].children[col+i+4].flag==1) {
				alert("黑棋获胜");
				location.reload();
			}
		}
		catch(e){}
		try{
			//纵向判断
			if(tbody.children[row+i].children[col].flag*tbody.children[row+i+1].children[col].flag*tbody.children[row+i+2].children[col].flag*tbody.children[row+i+3].children[col].flag*tbody.children[row+i+4].children[col].flag==1) {
				alert("黑棋获胜");
				location.reload();
			}
		}
		catch(e){}
		try{
			//"\"方向判断
			if(tbody.children[row+i].children[col+i].flag*tbody.children[row+i+1].children[col+i+1].flag*tbody.children[row+i+2].children[col+i+2].flag*tbody.children[row+i+3].children[col+i+3].flag*tbody.children[row+i+4].children[col+i+4].flag==1) {
				alert("黑棋获胜");
				location.reload();
			}
		}
		catch(e){}
		try{
			//"/"方向判断
			if(tbody.children[row-(i)].children[col+i].flag*tbody.children[row-(i+1)].children[col+i+1].flag*tbody.children[row-(i+2)].children[col+i+2].flag*tbody.children[row-(i+3)].children[col+i+3].flag*tbody.children[row-(i+4)].children[col+i+4].flag==1) {
				
				alert("黑棋获胜");
				location.reload();
			}
		}
		catch(e){}

		try{
			 if (tbody.children[row].children[col+i].flag+tbody.children[row].children[col+i+1].flag+tbody.children[row].children[col+i+2].flag+tbody.children[row].children[col+i+3].flag+tbody.children[row].children[col+i+4].flag==0) {
				alert("白棋获胜");
				location.reload();
			}
		}
		catch(e){}
		try{
			if (tbody.children[row+i].children[col].flag+tbody.children[row+i+1].children[col].flag+tbody.children[row+i+2].children[col].flag+tbody.children[row+i+3].children[col].flag+tbody.children[row+i+4].children[col].flag==0) {
				alert("白棋获胜");
				location.reload();
			}
		}
		catch(e){}
		try{
			if (tbody.children[row+i].children[col+i].flag+tbody.children[row+i+1].children[col+i+1].flag+tbody.children[row+i+2].children[col+i+2].flag+tbody.children[row+i+3].children[col+i+3].flag+tbody.children[row+i+4].children[col+i+4].flag==0) {
				alert("白棋获胜");
				location.reload();
			}
		} 
		catch(e){}
		try{
			if (tbody.children[row-i].children[col+i].flag+tbody.children[row-i-1].children[col+i+1].flag+tbody.children[row-i-2].children[col+i+2].flag+tbody.children[row-i-3].children[col+i+3].flag+tbody.children[row-i-4].children[col+i+4].flag==0) {
				
				alert("白棋获胜");
				location.reload();
			}
		}	
			
		
		catch(e){}
	}
	

}


//动态创建棋盘函数
function createBoard(rows,cols) {
	var tr = "";
	var html = "";
	for (var i = 0; i < rows; i++) {
		var tr = "";
		for (var j = 0; j < cols; j++) {
			tr+="<div class=\"td\"><img src=\"images/hei.jpg\"/><img class=\"bai\" src=\"images/bai.jpg\"/></div>";
		}
		html+="<div class=\"tr\">"+tr+"</div>";

	}
	tbody.innerHTML = html;
}
//实现下棋功能的函数，当flag为true时，下黑子，否则下白子，this.flag记录当前下的子的颜色，1为黑色，0为白色
function playChess(e){
	//阻止火狐浏览器自动选中图片
	e.preventDefault();
	if (flag==true) {
		this.flag = 1;
		//this.firstElementChild.src = "images/hei.jpg";
		this.firstElementChild.style.visibility = "visible";

		victory(this.index_row,this.index_col);
	}
	else{
		this.flag = 0;
		//this.firstElementChild.src = "images/bai.jpg";
		this.lastElementChild.style.visibility = "visible";
		victory(this.index_row,this.index_col);
	}
	//下一次下颜色不一样的棋子
	flag = !flag;
	
	//已经下过的地方不能下第二次	
	this.removeEventListener(e.type,playChess,false);
	
	
}









































