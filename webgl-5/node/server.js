// 本地测试用

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var ROOT = './webgl-5';

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
        var filepath = path.join(ROOT, pathname);
        if (pathname.indexOf('/lib/') === 0) {
            filepath = path.join('./', pathname);
        }
        fs.readFile(filepath, function(err, file) {
            if (err) {
                console.log(err);
                response.statusCode = 404;
                response.end();
            } else {
                response.end(file);
            }
        });
    }
}).listen(8080, 'localhost');