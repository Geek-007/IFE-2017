window.onload = function() {
    var chart = echarts.init(document.getElementById('chart'));

    var option = {
        color : ['#69f', '#30c'],
        title : {
            text : dataset.title,
            subtext : dataset.subTitle,
            sublink : dataset.subLink,
            left : 'center'
        },
        legend : {
            data : dataset.saleName,
            left : 'left'
        },
        tooltip : {
            trigger : 'axis',
            formatter : '{b}<br/>{a0}: {c0} ' + dataset.saleUnit[0] + '<br/>{a1}: {c1} ' + dataset.saleUnit[1]
        },
        xAxis :  {
            data : dataset.month
        },
        yAxis : [{
            name : dataset.saleName[0],
            axisLabel : {
                formatter : '{value} ' + dataset.saleUnit[0]
            }
        }, {
            name : dataset.saleName[1],
            max : 100,
            axisLabel : {
                formatter : '{value} ' + dataset.saleUnit[1]
            }
        }],
        series : [{
            name : dataset.saleName[0],
            type : 'bar',
            data : dataset.saleValue
        }, {
            name : dataset.saleName[1],
            type : 'line',
            data : dataset.salePercent,
            yAxisIndex : 1
        }]
    };

    chart.setOption(option);
};