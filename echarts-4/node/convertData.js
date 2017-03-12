// 仅为demo展示服务，将转换过的数据存储在converted.json中，在本地执行一次

var fs = require('fs');

var pre = require('./pre.js');
var fileIn = './echarts-4/data/sp500hst.txt';
var fileOut = './echarts-4/data/converted.json';

fs.readFile(fileIn, function(err, file) {
    if (err) {
        console.error(err);
    } else {
        var data = pre.preprocess(file);
        fs.writeFile(fileOut, JSON.stringify(data), function(err) {
            if (err) {
                console.error(err);
            } else {
                console.info('[info] saved file: ' + fileOut);
            }
        });
    }
});