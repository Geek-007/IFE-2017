window.onload = function() {
    var chart = echarts.init(document.getElementById('chart'));
    chart.showLoading();
    // $.get('data/sp500hst.txt', function(data) {     // 本地服务器测试用
    $.get('data/converted.json', function(data) {     // demo展示用
        var MA5 = calculateMA(5, data.aveStick);
        var MA10 = calculateMA(10, data.aveStick);
        var MA20 = calculateMA(20, data.aveStick);
        var MA30 = calculateMA(30, data.aveStick);
        var winSize = 30;
        var timeWin = {
            date: data.date.slice(0, winSize),
            aveStick: data.aveStick.slice(0, winSize),
            ma5: MA5.slice(0, winSize),
            ma10: MA10.slice(0, winSize),
            ma20: MA20.slice(0, winSize),
            ma30: MA30.slice(0, winSize),
            aveVol: data.aveVol.slice(0, winSize)
        };
        chart.hideLoading();
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
                data: timeWin.date
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
            series: [{
                name: '日k',
                type: 'candlestick',
                data: timeWin.aveStick
            }, {
                name: 'MA5',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: timeWin.ma5
            }, {
                name: 'MA10',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: timeWin.ma10
            }, {
                name: 'MA20',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: timeWin.ma20
            }, {
                name: 'MA30',
                type: 'line',
                lineStyle: {
                    normal: {
                        opacity: 0.5
                    }
                },
                data: timeWin.ma30
            }, {
                name: '成交量',
                type: 'bar',
                yAxisIndex: 1,
                data: timeWin.aveVol
            }]
        });
        var limit = data.date.length - winSize,
            cnt = 0;
        setInterval(function() {
            if (cnt >= limit) {
                timeWin = {
                    date: data.date.slice(0, winSize),
                    aveStick: data.aveStick.slice(0, winSize),
                    ma5: MA5.slice(0, winSize),
                    ma10: MA10.slice(0, winSize),
                    ma20: MA20.slice(0, winSize),
                    ma30: MA30.slice(0, winSize),
                    aveVol: data.aveVol.slice(0, winSize)
                };
                cnt = 0;
            } else {
                timeWin.date.shift();
                timeWin.aveStick.shift();
                timeWin.ma5.shift();
                timeWin.ma10.shift();
                timeWin.ma20.shift();
                timeWin.ma30.shift();
                timeWin.aveVol.shift();
                timeWin.date.push(data.date[winSize + cnt]);
                timeWin.aveStick.push(data.aveStick[winSize + cnt]);
                timeWin.ma5.push(MA5[winSize + cnt]);
                timeWin.ma10.push(MA10[winSize + cnt]);
                timeWin.ma20.push(MA20[winSize + cnt]);
                timeWin.ma30.push(MA30[winSize + cnt]);
                timeWin.aveVol.push(data.aveVol[winSize + cnt]);
                cnt++;
            }
            chart.setOption({
                xAxis: {
                    data: timeWin.date
                },
                series: [{
                    name: '日k',
                    data: timeWin.aveStick
                }, {
                    name: 'MA5',
                    data: timeWin.ma5
                }, {
                    name: 'MA10',
                    data: timeWin.ma10
                }, {
                    name: 'MA20',
                    data: timeWin.ma20
                }, {
                    name: 'MA30',
                    data: timeWin.ma30
                }, {
                    name: '成交量',
                    data: timeWin.aveVol
                }]
            });
        }, 200);
    });
};

function calculateMA(dayCount, stick) {
    var result = [];
    for (var i=0; i<stick.length; i++) {
        if (i < dayCount - 1) {
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