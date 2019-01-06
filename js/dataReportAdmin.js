$(function () {
    var minusVal = window.innerHeight - $(".table-render").height();
    var btnType;
    var compareArr = [];
    layui.use('form', function () {
        var form = layui.form;
        form.on('submit(formSubmit)', function (data) {
            return false;
        });
        form.on('submit(formSearch)', function (data) {
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
    layui.use(['table', 'layer'], function () {
        var size = screen.width > 2560 ? 2 : 1;
        var table = layui.table;
        var layer = layui.layer;
        table.render({
            id: 'reportTable',
            elem: '#reportTable',
            url: '../test-json/zg-reportTable.json' + getRandomNum(),
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
        table.on('tool(compareOpera)', function (obj) {
            var data = obj.data;
            if (obj.event === 'compare') {
                if(compareArr.length == 4){
                    $('#modalBg').show();
                    return;
                }
                var dom = obj.tr.find('.layui-btn').get(0);
                var isGray = $(dom).hasClass('layui-btn-gray');
                if (isGray) {
                    return;
                } else {
                    $(dom).addClass('layui-btn-gray');
                }
                compareArr.push(data);
                var str = '';
                for (var i = 0; i < compareArr.length; i++) {
                    str += '<div class="compare-item"><span>' + compareArr[i].title + '</span><span class="rt" value="' + i + '">&times;</span></div>'
                }
                $('.compare-list').html(str);
                $('.compare-wrapper').animate({ marginRight: '0' }, 300);
            }
        });

        var $ = layui.$, active = {
            getCheckData: function () { //获取选中数据
                var checkStatus = table.checkStatus('reportTable');
                var data = checkStatus.data;
                console.log(btnType, data);
            }
        };
        $('.download').on('click', function () {
            btnType = 'download';
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.del').on('click', function () {
            btnType = 'del';
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('span.times ').on('click', function () {
            $('#modalBg').hide();
            $('.compare-wrapper').animate({ marginRight: '0' }, 300);
        });
        //点击其他地方隐藏btns框(更多操作隐藏)
        $(document).mouseup(function (e) {
            var _con = $('.compare-wrapper'); // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $('.compare-wrapper').animate({ marginRight: '-300px' }, 300);
            }
        });
        $('.compare-wrapper').on('click', '.rt', function () {
            var idx = this.getAttribute('value');
            $(this).parent().remove();
            compareArr.splice(idx, 1);
            var dom = $('.layui-table').find('.layui-btn').get(idx);
            $(dom).removeClass('layui-btn-gray');
        });
        $('.compare-btn').on('click', function () {
            //对比操作
            //需要传入的数据compareArr
            if (compareArr.length > 4) {
                // layer.alert('最多4条！');
                initModal('最多添加四个对比条件，可删除后再添加。', 'compareListLimit');
                return;
            }
            location.href = './dataReportCompared.html'
        });
    });

});