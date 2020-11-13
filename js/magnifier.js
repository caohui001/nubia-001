      window.onload = function () {      
           

            $(function(){
				//让遮罩层移入的时候显示，移出的时候隐藏
                $("#small").mouseenter(function(){
                    $("#mark,#big").show();
                }).mouseleave(function(){
                    $("#mark,#big").hide();
					//鼠标移动的时候让遮罩层跟着移动，
                }).mousemove(function(ev){
					//改变遮罩层的位置
					//遮罩层当前距左的位置=鼠标移动的位置-遮罩层距左的距离-遮罩层一半的长度（为了鼠标在遮罩层的中间）
                    var l = ev.pageX - $(this).offset().left - 50;
                    if(l <= 60){
                        l = 60;
                    }
					//150是指#small宽250-遮罩层的100
                    if(l >= 200){
                        l = 200;
                    }
					//遮罩层当前距上的位置=鼠标移动的位置-遮罩层距上的距离-遮罩层一半的长度（为了鼠标在遮罩层的中间）
                    var t = ev.pageY - $(this).offset().top - 50;
                    if(t <= 0){
                        t = 0;
                    }
					//265是指#small高365-遮罩层的100
                    if(t >= 265){
                        t = 265;
                    }
                    $("#mark").css({
                        left: l,
                        top: t
                    })

                    //让big下面的图片，反方向，对应倍数移动
                    $("#big img").css({
                        left: -2 * l,
                        top: -2 * t
                    })
                })

                

            });
          }