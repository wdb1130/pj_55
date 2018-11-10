$(function () {
    layui.use('form', function () {
        var form = layui.form;
        form.on('submit(formSubmit)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
        form.on('submit(formSearch)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
        form.on('submit(formDel)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#pickDate1',
            theme: '#050732'
        });
    });
    // table
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            id: 'id',
            elem: '#reportTable',
            url: '../test-json/reportTable.json',
            cols: [
                [
                    { type: 'checkbox' }, 
                    { field: 'id', width: 80, title: 'ID', align: 'center'}, 
                    { field: 'title', width: 150, title: '名称', align: 'center' }, 
                    { field: 'cve', width: 150, title: 'CVE', align: 'center' }, 
                    { field: 'cvss', width: 80, title: 'CVSS', align: 'center' }, 
                    { field: 'risk', width: 150, title: 'risk', align: 'center' }, 
                    { field: 'num', width: 100, title: '主机数量', align: 'center' }, 
                    { field: 'intro', title: '简介', align: 'center' }
                ]
            ], 
            // page: true, 
            done: function(res,curr,count){
                $("[data-field='id']").css('display','none');
            }
        });
    });
});