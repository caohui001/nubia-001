
    var imgs=document.querySelectorAll('img')
    var nums=document.querySelectorAll('span')
    var left=document.querySelector('.left')
    var right=document.querySelector('.right')
    var width = document.body.offsetWidth;
    //当前显示图片的下标
    var index=0
    var timer
    move(imgs[index],width)
    //自动播放
    var timer2;
    autoMove()
    function autoMove(){
        timer2=setInterval(function () {
            fn1()
            index++
            if(index>6){
                index=0
            }
            fn2()
            move(imgs[index],100)
        },3000)
    }

    //点击数字切换图片
    for(var i=0;i<nums.length;i++){
        nums[i].n=i
        nums[i].onclick= function () {
            clearInterval(timer2)
            fn1()
            index=this.n
            fn2()
            move(imgs[index],100)
            autoMove()
        }
    }

    //点击右边
    right.onclick= function () {
        clearInterval(timer2)
        fn1()
        index++
        if(index>6){
            index=0
        }
        fn2()
        move(imgs[index],100)
        autoMove()
    }

    left.onclick= function () {
        clearInterval(timer2)
        fn1()
        index--
        if(index<0){
            index=6
        }
        fn2()
        move(imgs[index],100)
        autoMove()
    }
    function fn1(){
        imgs[index].style.zIndex=1
        imgs[index].style.opacity=0.1
        nums[index].className=''
    }
    function fn2(){
        nums[index].className='show'
        imgs[index].style.zIndex=2
    }
    function move(dom,target){
        //透明度初始值
        var opa=10
        clearInterval(timer)
        timer=setInterval(function () {
            if(opa > target){
                var speed=-5
            }else{
                var speed=5
            }
            //剩余运动量 <=每次运动的量
            if(Math.abs(opa-target)<=Math.abs(speed)){
                clearInterval(timer)
                dom.style.opacity=target/100
//                return
            }else{
                opa+=speed
                dom.style.opacity=opa/100
            }
        },20)
    }

