window.onload = function() {
    var chart = echarts.init(document.getElementById('chart'));
    chart.showLoading();
    $.get('data/jiangsu.json', function(jiangsu) {
        echarts.registerMap('jiangsu', jiangsu);
        $.get('data/converted.json', function(statistic) {
            chart.hideLoading();
            var option = {
                baseOption: {
                    timeline: {
                        autoPlay: true,
                        axisType: 'category',
                        playInterval: 1500,
                        controlPosition: 'right',
                        left: 40,
                        right: 30,
                        symbol: 'none',
                        label: {
                            normal: {
                                interval: 10
                            }
                        },
                        checkpointStyle: {
                            symbolSize: 8
                        },
                        controlStyle: {
                            showPrevBtn: false,
                            showNextBtn: false
                        }
                    },
                    title: {
                        text: '2017年1-3月江苏省主要城市空气质量（AQI、首要污染物）',
                        subtext: '数据来源：中华人民共和国环境保护部数据中心',
                        sublink: 'http://datacenter.mep.gov.cn/index!MenuAction.action?name=402880fb24e695b60124e6973db30011',
                        left: 'center'
                    },
                    visualMap: {
                        type: 'continuous',
                        min: 0,
                        max: 350,
                        range: [0, 300],
                        text: ['严重污染 >300', '优 0'],
                        hoverLink: false,
                        inRange: {
                            color: ['#0CE115', '#FFD91C', '#FF7E00', '#FF0000', '#99004C', '#99004C']
                        },
                        outOfRange: {
                            color: ['#7E0023']
                        },
                        left: '5%',
                        bottom: '10%'
                    },
                    tooltip: {},
                    geo: {
                        map: 'jiangsu',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                areaColor: '#ccc',
                                borderWidth: 0,
                                shadowBlur: 10
                            }
                        },
                        left: '8%'
                    },
                    series: [{
                        type: 'map',
                        name: 'AQI均值',
                        geoIndex: 0
                    }, {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        itemStyle: {
                            normal: {
                                borderColor: '#666',
                                borderWidth: 2
                            },
                            emphasis: {
                                shadowBlur: 5,
                                opacity: 1
                            }
                        }
                    }, {
                        type: 'pie',
                        center: ['75%', '40%'],
                        radius: '40%',
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    width: 2
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#666',
                                borderWidth: 2,
                                opacity: 0.7
                            }
                        },
                        animation: false
                    }]
                },
                options: []
            };

            var mapData = [];
            for (var i=0; i< statistic.cities.length; i++) {
                mapData.push({
                    name: statistic.cities[i],
                    value: statistic.aveAQI[i]
                });
            }
            option.baseOption.series[0].data = mapData;

            option.baseOption.timeline.data = statistic.quality.map(function(value) {
                return value.date;
            });
            
            for (i=0; i<statistic.quality.length; i++) {
                var opt = {
                    graphic: {
                        elements: [{
                            type: 'text',
                            style: {
                                text: statistic.quality[i].date,
                                x: 600,
                                y: 520,
                                font: '700 40px "Microsoft YaHei", sans-serif',
                                fill: '#666'
                            }
                        }]
                    },
                    series: [{}]
                };
                opt.series.push({
                    name: 'AQI当日值-' + statistic.quality[i].date,
                    data: statistic.quality[i].AQI.map(function(value, index) {
                        return [statistic.loc[index][0], statistic.loc[index][1], statistic.cities[index], value];
                    }),
                    symbolSize: function(value) {
                        return (value[3] / 5) < 15 ? 15 : (value[3] / 5);
                    },
                    tooltip: {
                        formatter: function(params) {
                            return params.seriesName + '<br />' + params.data[2] + '：' + params.data[3];
                        }
                    }
                });
                var pollutant = statistic.quality[i].pollutant;
                pollutant.sort();
                var pieData = [[1, pollutant[0]]];
                for (var j=1; j<pollutant.length; j++) {
                    if (pollutant[j] === pieData[pieData.length - 1][1]) {
                        pieData[pieData.length - 1][0]++;
                    } else {
                        pieData.push([1, pollutant[j]]);
                    }
                }
                pieData.sort(function(a, b) {
                    return b[0] - a[0];
                });
                opt.series.push({
                    name: '首要污染物-' + statistic.quality[i].date,
                    data: pieData.map(function(value) {
                        return value.concat(value[0] * 20);
                    }),
                    label: {
                        normal: {
                            formatter: function(params) {
                                return params.data[1];
                            },
                            textStyle: {
                                fontWeight: 'bold',
                                fontSize: 16
                            }
                        },
                        emphasis: {
                            formatter: function(params) {
                                return params.data[1];
                            },
                            textStyle: {
                                fontWeight: 'bold',
                                fontSize: 16
                            }
                        }
                    },
                    tooltip: {
                        formatter: function(params) {
                            return params.seriesName + '<br />' + params.data[1] + '：'
                                + params.data[0] + '市（' + (params.data[0] / 13 * 100).toFixed(2) + '%）';
                        }
                    }
                });
                option.options.push(opt);
            }

            chart.setOption(option);
        });
    });
};