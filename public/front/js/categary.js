/**
 * Created by asus on 2017/11/1.
 */
 var sc = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});


// 渲染左边一级分类列表
//渲染一级分类
$.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function (data) {
       var html = template("tpl1",data);
        $(".lt_category_l ul").html(html);
        renderSecond(data.rows[0].id);
    }
});

function renderSecond(id) {
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{
            id:id
        },
        success:function (data) {
            console.log(data);
            var html2 = template("tpl2",data);
            $(".lt_category_r ul").html(html2);
        }
    });
}
$(".lt_category_l").on("click","li",function () {
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
    sc[1].scrollTo(0,0,500);
});
