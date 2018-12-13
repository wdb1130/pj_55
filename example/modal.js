function initModal(funName, postodalData) {
    var modalHtml = $('<div id="modalBg">' +
        '<div id="chartContent">' +
        '<div class="modal-title">' +
        '<span></span>' +
        '<span>数据包大小变化率</span>' +
        '<span class="times">&times;</span>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div id="chartModal"></div>' +
        '</div>' +
        '</div>' +
        '</div>');

    $('body').append(modalHtml);

    initChartFun[funName]('chartModal', postodalData);
    
    $(".times").click(function () {
        modalHtml.remove();
    });
};