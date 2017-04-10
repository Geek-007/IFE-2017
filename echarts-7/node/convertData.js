// 将原始数据转换为满足可视化要求的json格式数据

var fs = require('fs');
var fileIn = './echarts-7/data/rawdata.txt';
var fileOut = './echarts-7/data/converted.json';

fs.readFile(fileIn, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        var converted = convert(data);
        fs.writeFile(fileOut, JSON.stringify(converted), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('[info] saved file: ' + fileOut);
            }
        });
    }
});

function convert(data) {
    // 原始数据格式：序号\t城市\tAQI指数\t首要污染物\t日期\t空气质量级别\r\n
    var raw = data.toString().split('\r\n');
    for (var i=0; i<raw.length; i++) {
        raw[i] = raw[i].split('\t');
    }
    // 徐州, 连云港, 宿迁, 淮安, 盐城, 扬州, 泰州, 南通, 南京, 镇江, 常州, 无锡, 苏州
    var loc = [
        [117.2, 34.26], [119.16,34.59], [118.3,33.96], [119.15,33.5], [120.13,33.38],
        [119.42,32.39], [119.9,32.49], [121.05,32.08], [118.78,32.04], [119.44,32.2],
        [119.95,31.79], [120.29,31.59], [120.62,31.32]
    ];

    var days = 90,
        cities = [],
        aveaqi = [];
    var sumaqi = 0;
    for (i=0; i<raw.length; i++) {
        sumaqi += parseInt(raw[i][2]);
        if ((i + 1) % days === 0) {
            cities.push(raw[i][1]);
            aveaqi.push(+(sumaqi / days).toFixed());
            sumaqi = 0;
        }
    }

    raw.sort(sortByDate);
    var quality = [];
    for (i=0; i<raw.length; i+=13) {
        var aqi = [],
            pollutant = [];
        for (var j=0; j<13; j++) {
            var current = raw[i + j];
            switch (current[1]) {
                case '徐州市':
                    aqi[0] = parseInt(current[2]);
                    pollutant[0] = current[3].split(',')[0];
                    break;
                case '连云港市':
                    aqi[1] = parseInt(current[2]);
                    pollutant[1] = current[3].split(',')[0];
                    break;
                case '宿迁市':
                    aqi[2] = parseInt(current[2]);
                    pollutant[2] = current[3].split(',')[0];
                    break;
                case '淮安市':
                    aqi[3] = parseInt(current[2]);
                    pollutant[3] = current[3].split(',')[0];
                    break;
                case '盐城市':
                    aqi[4] = parseInt(current[2]);
                    pollutant[4] = current[3].split(',')[0];
                    break;
                case '扬州市':
                    aqi[5] = parseInt(current[2]);
                    pollutant[5] = current[3].split(',')[0];
                    break;
                case '泰州市':
                    aqi[6] = parseInt(current[2]);
                    pollutant[6] = current[3].split(',')[0];
                    break;
                case '南通市':
                    aqi[7] = parseInt(current[2]);
                    pollutant[7] = current[3].split(',')[0];
                    break;
                case '南京市':
                    aqi[8] = parseInt(current[2]);
                    pollutant[8] = current[3].split(',')[0];
                    break;
                case '镇江市':
                    aqi[9] = parseInt(current[2]);
                    pollutant[9] = current[3].split(',')[0];
                    break;
                case '常州市':
                    aqi[10] = parseInt(current[2]);
                    pollutant[10] = current[3].split(',')[0];
                    break;
                case '无锡市':
                    aqi[11] = parseInt(current[2]);
                    pollutant[11] = current[3].split(',')[0];
                    break;
                case '苏州市':
                    aqi[12] = parseInt(current[2]);
                    pollutant[12] = current[3].split(',')[0];
                    break;
                default:
                    // nothing
            }
        }
        pollutant = pollutant.map(function(value) {
            return (value === '') ? '无污染物' : value;
        });
        quality.push({
            date: raw[i][4],
            AQI: aqi,
            pollutant: pollutant
        });
    }

    return {
        cities: cities,
        aveAQI: aveaqi,
        loc: loc,
        quality: quality
    };
}

function sortByDate(a, b) {
    if (a[4] < b[4]) {
        return -1;
    } else if (a[4] > b[4]) {
        return 1;
    } else {
        return 0;
    }
}