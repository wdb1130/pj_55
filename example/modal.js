function initModal(params) {
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

    $(".times").click(function () {
        modalHtml.remove();
    });
};