 window.onload = function () {
    // 中间导航模块
      $(function () {
        $(".xl_a").mouseover(function () {
          $(this).next().show();
          // $(this).next().css("height","200");
          $(this).css("color","#999");
        });
        $(".xl_a").mouseout(function () {
          $(this).next().hide();
          $(this).css("color","#333");
          // $(this).next().css("height","0")
        })

        $(".xl_a").next().mouseover(function () {
          $(this).show();
        });
        $(".xl_a").next().mouseout(function () {
          $(this).hide();
        });
      })


      //个人中心
      $(function () {
        $(".img_a1").mouseover(function () {
          $(this).next().show();
        });
        $(".img_a1").mouseout(function () {
          $(this).next().hide();
        })

        $(".img_a1").next().mouseover(function () {
          $(this).show();
        });
        $(".img_a1").next().mouseout(function () {
          $(this).hide();
        });
      })

      //购物车
      $(function () {
        $(".img_a2").mouseover(function () {
          $(this).next().show();
        });
        $(".img_a2").mouseout(function () {
          $(this).next().hide();
        })

        $(".img_a2").next().mouseover(function () {
          $(this).show();
        });
        $(".img_a2").next().mouseout(function () {
          $(this).hide();
        });
      })
      
    }
