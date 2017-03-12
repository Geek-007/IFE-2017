window.onload = function() {
    var chart = echarts.init(document.getElementById('chart'));
    chart.showLoading();
    // $.get('data/sp500hst.txt', function(data) {     // 本地服务器测试用
    $.get('data/converted.json', function(data) {     // demo展示用
        chart.hideLoading();
        data = JSON.parse(data);
        chart.setOption({
            title: {
                text: '2009年8月至2010年8月股票数据',
                subtext: '数据来源：互联网',
                sublink: 'http://pages.swcp.com/stocks/',
                left: 'center'
            },
            legend: {
                data: ['日k', 'MA5', 'MA10', 'MA20', 'MA30', '成交量'],
                top: 60
            },
            grid: {
                top: 100,
                bottom: 80
            },
            xAxis: {
                name: '日期',
                nameLocation: 'middle',
                nameGap: 25,
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                axisTick: {
                    alignWithLabel: true
                },
                data: data.date
            },
            yAxis: [{
                name: '指数',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                min: 30,
                max: 50
            }, {
                name: '成交量',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                max: 400000
            }],
            tooltip: {
                trigger: 'axis'
            },
            dataZoom: [{
                type: 'inside',
                startValue: 70,
                endValue: 120
            }, {
                type: 'slider',
                startValue: 70,
                endValue: 120
            }],
            series: [{
                name: '日k',
                type: 'candlestick',
                data: data.aveStick
            }, {
                name: 'MA5',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: calculateMA(5, data.aveStick)
            }, {
                name: 'MA10',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: calculateMA(10, data.aveStick)
            }, {
                name: 'MA20',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: calculateMA(20, data.aveStick)
            }, {
                name: 'MA30',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: calculateMA(30, data.aveStick)
            }, {
                name: '成交量',
                type: 'bar',
                yAxisIndex: 1,
                data: data.aveVol
            }]
        });
    });
};

function calculateMA(dayCount, stick) {
    var result = [];
    for (var i=0; i<stick.length; i++) {
        if (i < dayCount - 1) {     // [20170312]官方样例中此处判断条件为i<dayCount，但个人认为从下标第dayCount-1天就可以开始计算MA值【如有误请指正】
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j=0; j<dayCount; j++) {
            sum += stick[i - j][1];      // close
        }
        result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
}