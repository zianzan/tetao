mui(".mui-scroll-wrapper").scroll({
    indicators: false
});

function getHistory() {
    var search_history = localStorage.getItem("lt_search_history") || "[]";
    var arr =  JSON.parse(search_history);
    return arr;
}
function render() {
    var arr = getHistory();
    $(".lt_hostroty").html(template("tpl",{arr:arr}));
}
render();
$(".lt_hostroty").on("click",".icon_empty",function () {
    localStorage.removeItem("lt_search_history");
    render();
});
$(".lt_hostroty").on("click",".fa-close",function () {
    var btnArray=["是","否"];
    var index = $(this).data("index");
    mui.confirm("你确定要删除这条记录吗","警告",btnArray,function (data) {
        if (data.index == 0){
            var arr = getHistory();

            arr.splice(index,1);
            localStorage.setItem("lt_search_history", JSON.stringify(arr));
            render();
            mui.toast("操作成功");
        }else{
            mui.toast("操作取消");
        }
    });
});
$(".search_btn").on("click",function () {
    var key = $(".search_text").val().trim();
    if (key === ""){
        mui.alert("亲，您想买啥","温馨提示");
    return;
    }
    var arr = getHistory();
    var index = arr.indexOf(key);
    if (index > -1){
        arr.splice(index,1);
    }
    if (arr.length >= 10){
        arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    location.href = "searchList.html?key="+key;
});


