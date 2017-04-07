// 本地测试用

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var ROOT = './echarts-6';

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
        var pathname = url.parse(request.url).pathname;
        var fpath = path.join(ROOT, pathname);
        if (pathname.indexOf('/lib/') > -1) {
            fpath = path.join('.', pathname);
        }
        fs.readFile(fpath, function(err, file) {
            if (err) {
                console.log(err);
                response.statusCode = 404;
                response.end();
            } else {
                response.end(file);
            }
        });
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080, 'localhost');