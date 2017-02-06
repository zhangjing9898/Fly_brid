
window.onload=function(){
	/*global*/
	var wrapBg=document.getElementById("warpBg");
	/*headrTitle+headBird*/
	var headTitle=document.getElementById("headTitle");
	var headBird=document.getElementById("hearBird");
	
	var Y=3;
	var index=0;
	var imgArr=["img/bird0.png","img/bird1.png"];
	var headWaveTimer=setInterval(headWave,200);
	
	var Score=document.getElementById("score");
	var Num1=document.getElementById("num1");
	var Num2=document.getElementById("num2");
	var Num3=document.getElementById("num3");
	var gameOver=document.getElementById("gameOver");
	var NowScore=0;
	
	function headWave(){
		Y*=-1;
		headTitle.style.top=headTitle.offsetTop+Y+"px";
		headBird.src=imgArr[index++];
		if(index==2)
		{
			index=0;
		}
	}
	/*grassLand*/
	var grassLand1=document.getElementById("grassLand1");
	var grassLand2=document.getElementById("grassLand2");
	
	var landTimer=setInterval(landRun,30);//让草地动起来的定时器
	
	var blockArr=[];
	var blockDistance=baseObj.randomNum(130,250);
	function landRun(){
		if(grassLand1.offsetLeft<=-343){
			grassLand1.style.left="343px";
		}
		if(grassLand2.offsetLeft<=-343){
			grassLand2.style.left="343px";
		}
		grassLand1.style.left=grassLand1.offsetLeft-3+"px";
		grassLand2.style.left=grassLand2.offsetLeft-3+"px";
		
		if(blockArr.length)
		{
			for(var i=0;i<blockArr.length;i++)
			{
				blockArr[i].moveBlock();//管道移动起来
				//x,y,z代表三种情况
				var x=baseObj.rectangleCrashExamine(blockArr[i].downDivWrap,bird.div);
				var y=baseObj.rectangleCrashExamine(blockArr[i].upDivWrap,bird.div);
				var z=bird.div.offsetTop>=390;
				
				if(x||y||z)
				{
					window.clearInterval(landTimer);
					bird.fallSpeed=0;
					wrapBg.onclick=null;
//					Score.style.display="none";
					gameOver.style.display="block";
				}
			}
//			检查数组中最后一个block离开的距离，达到一定距离，就重新new 一个block，添加到数组。
			if(blockArr[blockArr.length-1].downDivWrap.offsetLeft<(450-blockDistance))
			{
				blockDistance=baseObj.randomNum(130,250);
				var newBlock=new Block();
				newBlock.createBlock();
				blockArr.push(newBlock);
			}
//			积分面板
			if(blockArr[0].downDivWrap.offsetLeft==-12)
			{
				NowScore++;
				if(NowScore<10)
				{
					Num1.style.backgroundImage="url(img/"+NowScore+".jpg)";
				}else if(NowScore<100)
				{
					Num2.style.display="block";
					Num1.style.backgroundImage="url(img/"+parseInt(NowScore/10)+".jpg)";
					Num2.style.backgroundImage="url(img/"+NowScore%10+".jpg)";
				}else if(NowScore<1000)
				{
					Num3.style.display="block";
					Num1.style.backgroundImage="url(img/"+parseInt(NowScore/100)+".jpg)";
					Num2.style.backgroundImage="url(img/"+parseInt(NowScore/10)%10+".jpg)";
					Num3.style.backgroundImage="url(img/"+NowScore%10+".jpg)";
				}
				console.log(NowScore);
			}
			
			//移除管道等
			if(blockArr[0].downDivWrap.offsetLeft<-50)
			{
				wrapBg.removeChild(blockArr[0].downDivWrap);
				wrapBg.removeChild(blockArr[0].upDivWrap);
				blockArr.shift(blockArr[0]);
				/*shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。*/
			}
			
		}
		
	}
	/*start*/
	var startBtn=document.getElementById("startBtn");
	
	startBtn.onclick=function()
	{
		headTitle.style.display="none";
		clearInterval(headWaveTimer);
		startBtn.style.display="none";
		//点击按键进入游戏界面
		bird.showBird(wrapBg);
		bird.flyBird();
		bird.wingWave();
		wrapBg.onclick=function(){
			bird.fallSpeed=-8;
		}
		var block=new Block();
		block.createBlock();
		blockArr.push(block);
		Num1.style.display="block";
	}
	
	var okBtn=document.getElementById("ok");
	okBtn.onclick=function()
	{
		window.location.href="index.html";//刷新页面
	}
}
