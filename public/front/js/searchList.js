$(function () {
    mui(".mui-scroll-wrapper").scroll({
        indicators: false
    });
    var data = {
        proName:'',
        brandId:'',
        price:'',
        num:'',
        page:1,
        pageSize:10
    };
    function render(data) {
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:data,
            success: function (data) {
                    setTimeout(function () {
                        $(".lt_product").html(template("tpl",data));
                    },1000);
            }
        });
    }
    var key = tools.getParam("key");
    $(".search_text").val(key);
    data.proName = key;
    render(data);

    // 点击搜索按钮
    $(".search_btn").on("click",function () {
        $(".lt_goods a").removeClass("now");
        $(".lt_goods span").removeClass("fa-angle-up").addClass("fa-angle-down");
        data.price = '';
        data.num = '';
        var key = $(".search_text").val().trim();
        if (key === ''){
            mui.toast("请输入搜索的内容");
        }
        $(".lt_product").html('<div class="loading"></div>');
        data.proName = key;
        render(data);
    });
    $(".lt_goods>a[data-type]").on("click",function () {
        var $span = $(this).find("span");
        if ($(this).hasClass("now")){
            $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else {
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_goods span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        var type = $(this).data("type");
        var value = $span.hasClass("fa-angle-down")? 2 : 1;
        data[type] = value;
        render(data);
    })
});
