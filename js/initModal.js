function initModal(modalTitle, funName, postodalData) {
    (funName.indexOf('drawLine') > -1) && (funName = 'drawLine');
    (funName.indexOf('drawOneFanPie') > -1) && (funName = 'drawOneFanPie');
    (funName.indexOf('drawLiquidFill') > -1) && (funName = 'drawLiquidFill');
    (funName.indexOf('draw3DCylinderH') > -1) && (funName = 'draw3DCylinderH');
    (funName.indexOf('drawWaterBall') > -1) && (funName = 'drawWaterBall');
    switch (funName) {
        case 'drawLine':
        case 'drawPlusLine':
        case 'drawVerticalBar':
        case 'drawVerticalBarH':
        case 'drawHorizontalBar':
        case 'drawVerticalSingleBar':
        case 'drawLiquidFill':
        case 'drawTwoFanPie':
        case 'drawOneFanPie':
        case 'draw3DCylinder':
        case 'draw3DCylinderH':
        case 'draw3DCylinderV':
        case 'drawRectRadar':
        case 'drawGradientLine':
        case 'drawScatter':
        case 'drawMeterPointer':
        case 'drawWaterBall':
            var modalHtml = $('<div id="modalBg">' +
                '<div id="chartContent">' +
                '<div class="modal-title">' +
                '<span></span>' +
                '<span>' + modalTitle + '</span>' +
                '<span class="times">&times;</span>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div id="chartModal"></div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(modalHtml);
            initChartFun[funName]('chartModal', postodalData);
            break;
        case 'drawHollowRing':
        case 'drawPartRing':
            var chartModalHtml = "";
            postodalData.forEach(function (item, idx) {
                var domId = 'chartChildModal' + (idx + 1);
                var chartModal = '<div class="chart-child-modal" id=' + domId + '></div>';
                chartModalHtml += chartModal;
                // chartGroup.append(chartModal);
            });
            var modalHtml = $('<div id="modalBg">' +
                '<div id="chartContent">' +
                '<div class="modal-title">' +
                '<span></span>' +
                '<span>' + modalTitle + '</span>' +
                '<span class="times">&times;</span>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div id="chartModal">' + chartModalHtml + '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(modalHtml);
            postodalData.forEach(function (item, idx) {
                var domId = 'chartChildModal' + (idx + 1);
                initChartFun[funName](domId, postodalData[idx]);
            });
            break;
        case 'drawRing':
            var html = postodalData[2];
            var modalHtml = $('<div id="modalBg">' +
                '<div id="chartContent">' +
                '<div class="modal-title">' +
                '<span></span>' +
                '<span>' + modalTitle + '</span>' +
                '<span class="times">&times;</span>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div id="chartModal"></div>' +
                // '<div class="rate-list">' + html + '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(modalHtml);
            initChartFun[funName]('chartModal', postodalData);
            // 图片赋值
            // var rateListW = $('.modal-body .rate-list').width();
            // $('.modal-body .rate-list').css('left', 'calc('+ postodalData[3] +'% - ' + rateListW + 'px)');
            break;
    }

    $(".times").click(function () {
        modalHtml.remove();
    });
};

// 随机数
function getRandomNum() {
    return '?flag=' + (Math.random() * 10001).toFixed(2);
}