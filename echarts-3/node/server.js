// 本地服务器，本地测试用

var http = require('http');
var fs = require('fs');
var ROOT = './';

http.createServer(function(request, response) {
    request.on('error', function(err) {
        console.log(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', function(err) {
        console.log(err);
    });
    if (request.method === 'GET') {
        var filepath = '';
        if (request.url.indexOf('/lib/') === 0) {
            filepath = ROOT + request.url;
        } else {
            filepath = ROOT + '/echarts-3' + request.url;
        }
        fs.readFile(filepath, function(err, file) {
            if (err) {
                console.log(err);
                response.statusCode = 404;
                response.end('Not Found');
            } else {
                response.end(file);
            }
        });
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080, 'localhost');