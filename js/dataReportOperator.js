$(function () {
    var minusVal = window.innerHeight - $(".table-render").height();
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
            theme: '#050737'
        });
    });
    // table
    layui.use('table', function () {
        var table = layui.table;
        var size = screen.width > 2560 ? 2 : 1;
        table.render({
            id: 'reportTable',
            elem: '#reportTable',
            url: '../test-json/reportTable.json' + getRandomNum(),
            height: 'full-' + minusVal,
            cols: [
                [
                    { type: 'checkbox' },
                    // { field: 'id', width: 80, title: 'ID', align: 'center' },
                    { field: 'title', width: 150 * size, title: '名称', align: 'center' },
                    { field: 'cve', width: 150 * size, title: 'CVE', align: 'center' },
                    { field: 'cvss', width: 80 * size, title: 'CVSS', align: 'center' },
                    { field: 'risk', width: 150 * size, title: 'risk', align: 'center' },
                    { field: 'num', width: 100 * size, title: '主机数量', align: 'center' },
                    { field: 'intro', title: '简介', align: 'center' },
                    { fixed: 'right', width: 80 * size, align: 'center', toolbar: '#reportOpera' }
                ]
            ],
            done: function (res, curr, count) {
                $("[data-field='id']").css('display', 'none');
            }
        });
        //监听工具条
        table.on('tool(detailList)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                console.log(data);
                // initModal
                initModal('详情页面', 'detailList', [data]);
            }
        });
        var $ = layui.$, active = {
            getCheckData: function () { //获取选中数据
                var checkStatus = table.checkStatus('reportTable');
                var data = checkStatus.data;
                console.log(data);
            }
        };
        $('.download').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });
});