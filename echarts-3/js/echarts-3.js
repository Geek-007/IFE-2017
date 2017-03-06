window.onload = function() {
    var emChart = document.getElementById('chart');
    emChart.style.width = window.innerWidth + 'px';
    emChart.style.height = window.innerHeight + 'px';

    var chart = echarts.init(emChart);
    chart.showLoading();
    $.get('data/ne_110m_land.json', function(worldLand) {
        chart.hideLoading();
        echarts.registerMap('world', worldLand);
        chart.setOption({
            title: {
                text: '世界主要陆地轮廓',
                subtext: '数据来源：Natural Earth',
                sublink: 'http://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/',
                left: 'center'
            },
            geo: {
                map: 'world',
                roam: true,
                scaleLimit: {
                    min: 0.5,
                    max: 3
                },
                aspectScale: 1
            }
        });
    });
};