function initModal(modalTitle, funName, postodalData, swiperThHeader) {
    (funName.indexOf('drawLine') > -1) && (funName = 'drawLine');
    (funName.indexOf('drawOneFanPie') > -1) && (funName = 'drawOneFanPie');
    (funName.indexOf('drawLiquidFill') > -1) && (funName = 'drawLiquidFill');
    (funName.indexOf('draw3DCylinderH') > -1) && (funName = 'draw3DCylinderH');
    (funName.indexOf('drawWaterBall') > -1) && (funName = 'drawWaterBall');
    (funName.indexOf('swiperDataList') > -1) && (funName = 'swiperDataList');
    $("#modalBg").length && $("#modalBg").remove();
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
            var resizeChart = [];
            postodalData.forEach(function (item, idx) {
                var domId = 'chartChildModal' + (idx + 1);
                var chartModal = '<div class="chart-child-modal" id=' + domId + '></div>';
                chartModalHtml += chartModal;
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
                var myChart = initChartFun[funName](domId, postodalData[idx]);
                resizeChart.push(myChart);
                window.addEventListener("resize", function () {
                    for (var i = 0; i < resizeChart.length; i++) {
                        resizeChart[i].resize();
                    }
                });
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
        case 'swiperDataList':
            var swiperDataHtml = "";
            var len = Object.getOwnPropertyNames(postModalData[0][0]).length;
            if (len > 3) {
                postModalData[0].forEach(function (item) {
                    swiperDataHtml += '<div class="data-list">' +
                        "<span>" + item.name + "</span>" +
                        "<span>" + item.value + "%</span>" +
                        "<span>" + (item.state ? '已修复' : '未修复') + "</span>" + 
                        "<span>" + item.date + "</span>" +
                        "</div>";
                });
            } else {
                postModalData[0].forEach(function (item) {
                    swiperDataHtml += '<div class="data-list">' +
                        "<span>" + item.name + "</span>" +
                        "<span>" + item.value + "%</span>" +
                        "<span>" + item.date + "</span>" +
                        "</div>";
                });
            }
            var modalHtml = $('<div id="modalBg">' +
                '<div id="chartContent">' +
                '<div class="modal-title">' +
                '<span></span>' +
                '<span>' + modalTitle + '</span>' +
                '<span class="times">&times;</span>' +
                '</div>' +
                '<div class="modal-th-header">' + swiperThHeader + '</div>' +
                '<div class="modal-body">' +
                '<div class="swiper-data">' +
                swiperDataHtml
                + '</div > ' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(modalHtml);
            $(".swiper-data").niceScroll({
                cursorcolor: "#0E3FB9",
                cursorwidth: "8px",
                background: "#03062A",
                cursorborder: "1px solid #0E3FB9",
                cursorborderradius: 0
            });
            break;
        case 'compareListLimit':
            var modalHtml = $('<div id="modalBg">' +
                '<div id="chartContent" class="compare-list-limit">' +
                '<div class="modal-title">' +
                '<span></span>' +
                '<span></span>' +
                '<span class="times">&times;</span>' +
                '</div>' +
                '<div class="compare-modal-body">' +
                '<span class="compare-list-title">' + modalTitle + '</span>' +
                '<span class="compare-list-sure">确定</span>' +
                '</div>' +
                '</div>' +
                '</div>');
            $('body').append(modalHtml);
            break;
    }
    $(".times,.compare-list-sure").click(function () {
        modalHtml.remove();
    });
};

// 随机数
function getRandomNum() {
    return '?flag=' + (Math.random() * 10001).toFixed(2);
}