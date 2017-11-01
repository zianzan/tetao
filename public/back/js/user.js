$(function () {
    var currentPage = 1;
    var pageSize = 8;
    function render() {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                console.log(data);
                var html = template("tpl", data);
                $("tbody").html(html);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    size:"small",
                    totalPages: Math.ceil(data.total/pageSize),
                    onPageClicked:function (event, originalEvent, type,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    render();
   $("tbody").on("click",".btn",function () {
      $("#changModal").modal("show");
       var id = $(this).parent().data("id");
       var isDelete = $(this).parent().data("isDelete");
       isDelete = isDelete === 1 ? 0 : 1;
       $(".modal_confirm").off().on("click",function () {
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id:id,
                    isDelete:isDelete
                },
                success: function (data) {
                    if (data.success){
                        $("#changModal").modal("hide");
                        render();
                    }
                }
            });
       });
   });

});