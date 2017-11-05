/**
 * Created by asus on 2017/11/4.
 */
$(function () {
   mui.init({
       pullRefresh : {
           container:".mui-scroll-wrapper",
           down : {
               auto: true,
               callback:function () {
                   $.ajax({
                       type:"get",
                       url:"/cart/queryCart",
                       success:function (data) {
                           console.log(data);
                           setTimeout(function () {
                               console.log(data);
                               tools.checkLogin(data);
                               $("#OA_task_2").html(template("tpl",{data:data}));
                               mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                           },1000);
                       }
                   })
               }
           }
           }
   });
    $("#OA_task_2").on("tap",".btn_delete", function () {
        var id = $(this).data("id");
        mui.confirm("确认删除吗?","提示",["否","是"],function (e) {
            if (e.index === 0){
                mui.toast("操作取消");
            }else {
                $.ajax({
                    type:"get",
                    url:"/cart/deleteCart",
                    data:{
                        id:[id]
                    },
                    success:function (data) {
                        tools.checkLogin(data);
                        if (data.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })
    });
    $("#OA_task_2").on("tap", ".btn_edit",function () {
        var data = this.dataset;
        var html = template("tpl2", data);
        console.log(html);
        html = html.replace(/\n/g,"");
        mui.confirm(html,"编辑商品",["确定","取消"],function (e) {
            if (index === 0){
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:data.id,
                        size:$(".lt_edit_size span.now").html(),
                        num:$(".mui-numbox-input").val()
                    },
                    success:function (data) {
                        tools.checkLogin(data);
                        if(data.success){
                            //如果成功，重新下拉一次
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }else {
                mui.toast("操作取消");
            }
        });
        mui(".mui-numbox").numbox();
        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        })
    });
    $("#OA_task_2").on("change", ".ck", function () {
        //获取到选中的checkbox，计算选中checkbox的商品的金额

        var total = 0;

        $(":checked").each(function (i, e) {

            total +=  $(this).data("num") * $(this).data("price");

        });

        $(".lt_total span").html(total);
    });
});