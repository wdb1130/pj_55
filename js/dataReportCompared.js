$(function () {
    layui.use('form', function () {
        var form = layui.form;
        form.on('select(reportType)', function (data) {
            console.log(data.value)
        });
    });

    $('.form-table').on("click", '.times', function () {
        $(this).parent().parent().remove();
    })

});