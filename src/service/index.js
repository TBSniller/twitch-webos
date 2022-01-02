const pkgInfo = require('./package.json');
const Service = require('webos-service');
const service = new Service(pkgInfo.name);
const url = require('url');

const regeneratorRuntime = require("regenerator-runtime");

var http = require('http');
var fs = require('fs');
var path = require('path');

var keepAlive;

service.activityManager.create("keepAlive", function(activity) {
    keepAlive = activity; 
}); 

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = './http' + url.parse(request.url).pathname;

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                response.writeHead(404);
                response.end('Not found.', 'utf-8');
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');

service.register("call", function(message) {
    console.log("call called!");
});

service.register("shut", function(message) {
    // When you're done, complete the activity 
    service.activityManager.complete(keepAlive, function(activity) { 
    console.log("completed activity"); 
    });
})

/* 
devServer: {
    port: PORT,
    allowedHosts: ['127.0.0.1', '.twitch.tv', '.youtube.com'],
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.resolve('./build'),
    },
    client: {
      webSocketURL: {
        hostname: '127.0.0.1',
        protocol: 'ws',
      },
    },
    onAfterSetupMiddleware: ({app}) => {
      app.get('*', (req, res) => {
        got
          .stream(`${PROD_ENDPOINT}${req.path}`)
          .on('error', () => res.sendStatus(404))
          .pipe(res);
      });
    },
  }, */