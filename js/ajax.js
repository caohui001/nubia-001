$(function(){
  sc_num();
  sc_msg();

 $.ajax({
  type:"get",
  url:"data/nby.json",
  //dataType:"jsonp",
  success:function(data){
   //一定要注意数据的层级关系：result[0].data.content;
    //var data = result[0].data.content;
    for(var i = 0;i < data.length;i++){
      var nbylist = $(
        `<div class="p_list">
          <a href="${data[i].link}">
            <img src="${data[i].image}" alt="">
            <div>
              <p class="image">${data[i].product_name}  ${data[i].color_name}</p>
              <p class="details"> </p>
              <p class="price">${data[i].price} <span style="text-decoration: line-through;class="span1">${data[i].origin_price} </span></p>
            </div>
          </a>
          <div class="back">
          <div id="${data[i].sid}" class="buy" >加入购物车</div></div>
          
        </div>`
        
      );
      nbylist.appendTo($(".box-c"));
    }    
  }
})
    // 购物车添加功能
    
  $(".box-c").on("click",".buy",function(){
    var sid = this.id;
    
    //alert(sid);
    //存储购物车商品的键为goods，判断他是否为null，是的话就是第一次添加
    var first = $.cookie("goods") === null ? true : false;
    //如果是第一次添加
    if(first){
      var cookieArr = [{id:sid,num:1}];
      $.cookie("goods",JSON.stringify(cookieArr),{
        expires:7
      })
    }else{
      //查找之前是否添加过
      //取出字符串转成数组
      var cookieArr = JSON.parse($.cookie("goods"));
      
      var same = false;//如果没添加过
      //使用循环来判断是否有符合条件的元素
      for(var i = 0;i < cookieArr.length;i++){
        //判断当前点击购物车的ID是否等于cookieArr中的其中一个id
        if(cookieArr[i].id == sid){
          same = true;//如果有的话说明之前添加过
          break;
        }
      }
      if(same){
        //如果添加过数量+1
        cookieArr[i].num++
      }else{
        //如果没添加过,数量为1，添加到cookieArr.
        let obj = {id:sid,num:1}
        cookieArr.push(obj);
      }
      //存进cookie
      $.cookie("goods",JSON.stringify(cookieArr),{
        expires:7
      })
    }
    sc_num();
    sc_msg();
  })

  //给删除按钮添加点击
  $("tbody").on("click",'.cart-close',function(){
    //删除节点  页面上要删除这个节点，cookie中也要删除
    var sid = $(this).closest("tr").remove().attr("index");
    var cookieArr = JSON.parse($.cookie("goods"));
    var index = cookieArr.findIndex(item => item.sid == sid);
    cookieArr.splice(index, 1);
        //判断cookieArr是否为空
    cookieArr.length === 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        })
        sc_num();
  })
  $("tbody").on("click", ".table-add", function(){
   // console.log(this)
      var sid = $(this).attr("index");
      var price = unitPrice(sid);
      //console.log(sid)
        //1、先找到这个id的cookie数据
    var cookieArr = JSON.parse($.cookie("goods"));
        var index = cookieArr.findIndex(item => item.id == sid);
          cookieArr[index].num++;
        //页面显示的数量
        $(this).closest('td').find(".num").html(`${cookieArr[index].num}`);
        $(this).closest('tr').find('.sum').html(`${'￥'+cookieArr[index].num*price}`)
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        })
        sc_num();
      })
       $("tbody").on("click", ".table-cut", function(){
      var sid = $(this).attr("index");
       var price = unitPrice(sid);
        //1、先找到这个id的cookie数据
    var cookieArr = JSON.parse($.cookie("goods"));
        var index = cookieArr.findIndex(item => item.id == sid);
          cookieArr[index].num === 1? alert('数量最少为1') : cookieArr[index].num--;
        //页面显示的数量
        $(this).closest('tr').find(".btn-cnts .num").html(cookieArr[index].num);
        $(this).closest('tr').find('.sum').html(`${'￥'+cookieArr[index].num*price}`)
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        })
        sc_num();
      })
      //计算商品的总和
      function sc_num(){
        var sum = 0;
        var total = 0;
        var cookieStr = $.cookie("goods");
        if(cookieStr){
          var cookieArr = JSON.parse(cookieStr);
          for(var i = 0; i < cookieArr.length; i++){
            sum += cookieArr[i].num;
            total += sum * unitPrice(cookieArr[i].id)
          }
        }
        $('.total').html(`${'￥'+total}`)
         $('.span-num1').html(`${sum}`)
        //console.log(total)
      }


      function unitPrice(id){
        var price = 0;
        $.ajax({
          type: "get",
          url: "data/nby.json",
          async:false,//改成同步
          success: function(arr){
            //在arr中将已经加入购物车的数据拿出来
            var cookieStr = $.cookie("goods");
            if(cookieStr){
              var cookieArr = JSON.parse(cookieStr);
              for(var i = 0; i < arr.length; i++){
                for(var j = 0; j < cookieArr.length; j++){
                  if(arr[i].sid == cookieArr[j].id){
                    price =arr[i].price;
                  }
                }
              }
            }
          }
        })
        return price;
      }
      //加载购物车商品
      //cookie 放着我们加入购物车的商品 id num
      //商品的具体的数据  数据源
       function sc_msg(){
         $("table tbody").empty();
        $.ajax({
          type: "get",
          url: "data/nby.json",
          success: function(arr){
            //在arr中将已经加入购物车的数据拿出来
            var cookieStr = $.cookie("goods");
            var newArr = [];
            if(cookieStr){
              var cookieArr = JSON.parse(cookieStr);
              for(var i = 0; i < arr.length; i++){
                for(var j = 0; j < cookieArr.length; j++){
                  if(arr[i].sid == cookieArr[j].id){
                    //将数据添加上述
                    arr[i].num = cookieArr[j].num;
                    newArr.push(arr[i]);
                    break;
                  }
                }
              }
              //console.log(newArr);
              //先清空一下上一次的数据，empty()
              
              //将找出来的数据，在购物车的部分加载出来
              for(var i = 0;i < newArr.length;i++){
                var node = $(`<tr style="border-bottom: 1px solid #eee;">
                <td class="productImage"><img src="${newArr[i].image}" alt=""></td>
                <td class="productname" valign="top"><a href="" target="_blank" productid="1476" class="pdt-title">${newArr[i].product_name}</a></td>
                <td class="productPrice">
                  ￥${newArr[i].price}
                </td>
                <td>
                  <div class="btn-cnts">
                    <span class="table-cut" index="${newArr[i].sid}">-</span>

                    <p class="num cart-cnt">${newArr[i].num}</p>

                    <span class="table-add" index="${newArr[i].sid}">+</span>
                  </div>
                </td>
                <td class="sum" style="line-height: 1.8;">${'￥'+newArr[i].num*newArr[i].price}

                </td>
                <td class="td-shanchu"><a href="javascript:;" title="删除" class="cart-close close" index="${newArr[i].sid}">x</a></td>
              </tr>`);
              node.appendTo($(".container tbody"));
              }
            }
          }
        })
      }

        
   })












