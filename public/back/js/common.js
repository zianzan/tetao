if(location.href.indexOf("login.html") == -1 ){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                //说明用户没有登录，跳转到登录页面
                location.href = "login.html";
            }
        }
    });
}

$(document).ajaxStart(function () {
    //让进度条显示出来
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});

$(".icon_menu").on("click",function () {
    $(".lt-aside").toggleClass("now");
    $(".lt-product").toggleClass("now");
});
$(".classify").on("click",function () {
    $(".child").slideToggle();
});
// $(".nav a").on("click",function () {
//     $(this).toggleClass("now");
// });
$(".icon_logout").on("click", function () {
    $("#logoutModal").modal("show");
});
$(".btn_logout").on("click",function () {
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function (data) {
            if (data.success){
                window.location.href = "login.html";
            }
        }
    })
});
