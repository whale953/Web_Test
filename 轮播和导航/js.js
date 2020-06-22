//封装一个代替getElementById()的方法
function byid(id){
  return typeof(id)==="string"?document.getElementById(id):id;
}

//全局变量
var index=0,
    timer=null,
    pics=byid("banner").getElementsByTagName("div"),
    dots=byid("dots").getElementsByTagName("span"),
    prev=byid("prev"),
    next=byid("next"),
    menu=byid("menu-content"),
    menuitem=menu.getElementsByClassName("menu-item"),
    subMenu=byid("sub-menu"),
    innerBox=subMenu.getElementsByClassName("inner-box"),
  
    len=pics.length;


function slideImg(){
  var main=byid("main");
  //鼠标滑过清楚定时器，离开继续
  main.onmouseover=function(){

    if(timer) {clearInterval(timer);}
  }
  //调用onmouseout事件，鼠标划过后开始轮番播放图片，划过之前不会触发事件
  main.onmouseout=function(){
      timer=setInterval(function(){
         index++; 
         if(index >=len){
           index=0;
         }
         //切换图片
         changeImg();
      },3000);
  }
  //调用onmouseout方法，自动在main上触发鼠标离开的事件
  main.onmouseout();

  //导航菜单的隐藏与显示
  //遍历并绑定事件
  for(var m=0;m<menuitem.length;m++){
    //给每一个menu-item定义data-index的属性，作为索引，data-index不是html属性，所以需要用方法添加
    menuitem[m].setAttribute("data-index",m);
    menuitem[m].onmouseover=function(){
      subMenu.className="sub-menu";
      var idx=this.getAttribute("data-index");
      for(var j=0;j<innerBox.length;j++){
          innerBox[j].style.display='none';
          menuitem[j].style.background="none";
      }
      //鼠标滑过时，去掉类名中的hide
      innerBox[idx].style.display='block';
      menuitem[idx].style.background='rgba(0,0,0,0.4)';
    }
    menu.onmouseout=function(){
      subMenu.className="sub-menu hide";
      menuitem[j].style.background='none';
    }
    subMenu.onmouseover=function(){
      this.className="sub-menu";
    }
    subMenu.onmouseout=function(){
      this.className="sub-menu hide";
    }
   
  }

  //点击上一张，下一张切换图片
  next.onclick=function(){
    index++;
    if(index>=3){
      index=0;
    }
    changeImg();
  }
  prev.onclick=function(){
    index--;
    if(index<0){
      index=len-1;
    }
    changeImg();
  }

  //遍历所有点击，且绑定点击事件，点击圆点切换图片
  for(var d=0;d<len;d++){
    //function（函数）会改变作用域，在function中d的值会变成最终值，即3（当d判定为3时，结束d++），所以函数为外面，为所有span添加一个id的属性，值为d，作为当前span的索引
    //id属性为html属性，所以直接.id使用
    dots[d].id=d;
    dots[d].onclick=function(){
      //改变索引值为当前span的id值
      //这里this值，onclick事件绑在哪，this就指是谁的值
      index=this.id;
      //调用changeimag，实现切换图片
      changeImg();
    }
  }
}
slideImg();

//封装切换图片的方法
function changeImg(){
  //遍历banner下所有的div，将其隐藏
  //遍历doys下所有的span，将span清除类
  for(var i=0;i<len;i++){
      pics[i].style.display="none";
      dots[i].className="";
  }
  //根据index索引，找到当前div和span，将其显示出来和设为当前
  pics[index].style.display='block';
  dots[index].className="active";
}
