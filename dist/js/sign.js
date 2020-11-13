window.onload = function (){
  $(".qq").hover(function(){
    $(this).css("background-position","-1px -30px");
  },function(){
    $(this).css("background-position","-1px -1px");
  })

  $(".weibo").hover(function(){
    $(this).css("background-position","-88px -30px");
  },function(){
    $(this).css("background-position","-88px -1px");
  })

  $(".alipay").hover(function(){
    $(this).css("background-position","-30px -30px");
  },function(){
    $(this).css("background-position","-30px -1px");
  })

   $(".wx").hover(function(){
    $(this).css("background-position","-59px -30px");
  },function(){
    $(this).css("background-position","-59px -1px");
  })


  // 切换登录方式
  $("#btn1").click(function(){
    $(this).addClass("cur");
    $("#btn2").removeClass("cur");
    $(".reg-id").css("display","block");
    $(".reg-phone").css("display","none");

  })
  $("#btn2").click(function(){
    $(this).addClass("cur");
    $("#btn1").removeClass("cur");
    $(".reg-phone").css("display","block");
    $(".reg-id").css("display","none");
    
  })

  


}