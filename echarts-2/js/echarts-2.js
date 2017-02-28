window.onload = function() {
    var chart = echarts.init(document.getElementById('chart'));

    var option = {
        title: {
            text: dataset.title,
            textStyle: {
                color: '#000',
                fontSize: 24
            },
            subtext: dataset.subTitle,
            sublink: dataset.subLink,
            subtextStyle: {
                color: '#333',
                fontSize: 18
            },
            top: 20,
            left: '5%'
        },
        legend: {
            top: 90,
            left: '5%',
            itemGap: 30,
            itemWidth: 40,
            itemHeight: 15,
            textStyle: {
                fontSize: 16
            },
            data: [{
                name: dataset.seriesName[0],
                icon: 'rect'
            }, {
                name: dataset.seriesName[1],
                icon: 'rect'
            }]
        },
        grid: {
            top: 130,
            right: '20%',
            bottom: 80,
            left: '5%'
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0} ' + dataset.unit + '<br/>{a1}: {c1} ' + dataset.unit
        },
        xAxis: [{
            data: dataset.month,
            axisLine: {
                onZero: false,
                lineStyle: {
                    width: 2
                }
            },
            axisTick: {
                inside: true,
                alignWithLabel: true,
                lineStyle: {
                    width: 2
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 18
                }
            }
        }, {
            axisLine: {
                lineStyle: {
                    color: '#e00',
                    width: 2
                }
            },
            z: 2
        }],
        yAxis: {
            position: 'right',
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 18
                },
                formatter: '{value} ' + dataset.unit
            },
            splitLine: {
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            }
        },
        series: [{
            name: dataset.seriesName[0],
            type: 'bar',
            data: dataset.powerfire
        }, {
            name: dataset.seriesName[1],
            type: 'bar',
            barWidth: 15,
            barGap: 0,
            data: dataset.powerwater
        }],
        graphic: {
            elements: [{
                type: 'text',
                bottom: 20,
                left: '5%',
                style: {
                    text: '说明：这是一张自定义统计图表',
                    font: '18px "MicroSoft YaHei", sans-serif'
                }
            }]
        },
        color: ['#69f', '#30c'],
        backgroundColor: '#ddd'
    };

    chart.setOption(option);
};