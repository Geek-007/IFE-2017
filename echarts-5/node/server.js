// 本地服务器，每次读取请求的数据文件，并在需要时对数据做转换处理，不存储，直接将处理好的数据返回给前端

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var pre = require('./pre.js');
var ROOT = './echarts-5';

http.createServer(function(request, response) {
    request.on('error', function(err) {
        console.error(err);
        response.statusCode = '400';
        response.end();
    });
    response.on('error', function(err) {
        console.error(err);
    });
    if (request.method === 'GET') {
        var pathname = url.parse(request.url).pathname;
        var filepath = path.join(ROOT, pathname);
        if (request.url === '/data/sp500hst.txt') {
            fs.readFile(filepath, function(err, file) {
                if (err) {
                    console.error(err);
                    response.statusCode = 404;
                    response.end('Not Found');
                } else {
                    var data = pre.preprocess(file);
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(data));
                }
            });
        } else if (request.url === '/data/converted.json') {
            fs.readFile(filepath, function(err, file) {
                if (err) {
                    console.error(err);
                    response.statusCode = 404;
                    response.end('Not Found');
                } else {
                    response.setHeader('Content-Type', 'application/json');
                    response.end(file);
                }
            });
        } else {
            if (request.url.indexOf('/lib/') === 0) {
                filepath = path.join('.', pathname);
            }
            fs.readFile(filepath, function(err, file) {
                if (err) {
                    console.error(err);
                    response.statusCode = 404;
                    response.end('Not Found');
                } else {
                    response.end(file);
                }
            });
        }
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080, 'localhost');