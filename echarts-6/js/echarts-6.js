window.onload = function() {
    var chart = echarts.init(document.getElementById('chart'));
    chart.showLoading();
    $.get('/data/dolphins.gexf', function(xml) {
        chart.hideLoading();
        var graph = echarts.dataTool.gexf.parse(xml);
        graph.nodes.forEach(function(node) {
            node.value = node.symbolSize;
            node.category = node.attributes.modularity_class;   // 对应series中categories的index
            node.label = {
                normal: {
                    show: node.value > 20,
                    textStyle: {
                        color: '#000'
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#000',
                        fontWeight: 'bold'
                    }
                }
            };
        });
        var cate = [];
        for (var i=0; i<4; i++) {
            cate[i] = {
                name: 'community' + (i + 1)
            };
        }
        chart.setOption({
            title: {
                text: 'Dolphin social network',
                subtext: '数据来源：http://www-personal.umich.edu/~mejn/netdata/',
                sublink: 'http://www-personal.umich.edu/~mejn/netdata/',
                left: 'center'
            },
            legend: {
                data: cate,     // 这里legend基于series的categories展现，而不是基于series的name
                bottom: 0
            },
            tooltip: {},
            series: [{
                type: 'graph',
                categories: cate,   // categories的类型是数组，其中每一项必须是对象（与legend的data不同）
                data: graph.nodes,
                links: graph.links,
                roam: true,
                focusNodeAdjacency: true,
                lineStyle: {
                    normal: {
                        color: 'source',
                        curveness: 0.4
                    },
                    emphasis: {
                        width: 2,
                        opacity: 1
                    }
                }
            }],
            color: ['rgb(35,150,111)', 'rgb(255,112,69)', 'rgb(217,125,216)', 'rgb(0,199,255)']     // 改变legend的颜色
        });
    });
};