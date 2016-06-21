<script type="text/javascript">

 function touchMove(temp){
 	var startX = 0, startY = 0; //触摸开始时手势横纵坐标 
	var temPos; //滚动元素当前位置
	var timer = null; //计时器
	var oPosition = {}; //触点位置
	var obj=temp;

   bindTochuEvent();
    // 绑定触摸事件
    function bindTochuEvent(){
        obj.get(0).addEventListener('touchstart', touchStartFunc, false);
        obj.get(0).addEventListener('touchmove', touchMoveFunc, false);
        obj.get(0).addEventListener('touchend', touchEndFunc, false);
    }
    // 获取触点位置
    function touchPos(e){    
        var touches = e.changedTouches, l = touches.length, touch, tagX, tagY;
        for (var i = 0; i < l; i++) {
            touch = touches[i];
            tagX = touch.clientX;
            tagY = touch.clientY;
        }
        oPosition.x = tagX;
        oPosition.y = tagY;
        return oPosition;
    }
    // 触摸开始
    function touchStartFunc(e){
        // clearInterval(timer);
        touchPos(e);
        startX = oPosition.x;
        startY = oPosition.y;
        temPos = obj.position().left;
    }
    // 触摸移动 
    function touchMoveFunc(e){

        touchPos(e);
        var moveX = oPosition.x - startX;
        var moveY = oPosition.y - startY;
        if (Math.abs(moveY) < Math.abs(moveX)) {
            e.preventDefault();
            var o=temPos + moveX;
            // obj.get(0).css({
            //     left: temPos + moveX
            // });
         obj.css('transform','translateX('+o+'px)');
         obj.css('webkitTransform','translateX('+o+'px)');
        }
    }
    // 触摸结束
    function touchEndFunc(e){
        touchPos(e);
        var moveX = oPosition.x - startX;
        var moveY = oPosition.y - startY;
        var pW=$(window).width(),//屏幕宽
	        clsW=$(".clsList").width(),//栏目宽度
	        transStr=obj.get(0).style.transform,
            moveNum=transStr.slice(transStr.indexOf('(')+1,(transStr.length-3));      
        if (Math.abs(moveY) < Math.abs(moveX)) {
            if (moveX > 0) {//如果是向右边移动
	          if(moveNum>=0||moveNum-(pW-clsW)<0){
	           	obj.css('transform','translateX('+0+'px)');
	           	obj.css('webkitTransform','translateX('+0+'px)');
	           };  
            }else {//如果是向左移动
               // obj.css('webkitTransform','translateX('+moveX+'px)');
                if(moveNum>=0||moveNum-(pW-clsW)<0){
                	obj.css('transform','translateX('+(pW-clsW)+'px)');
                	obj.css('webkitTransform','translateX('+(pW-clsW)+'px)');
                }
            }
            
        }
    }

  }

</script>
