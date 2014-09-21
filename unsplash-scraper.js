var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var exec = require('child_process').exec;

(function() {
    var dlDir = './downloads/';
    var host = 'http://unsplash.com';
    //grabs all images and stores in array
    request(host, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('.photo a').each(function(){
            var dlPage = $(this).attr('href');

            request(host+dlPage,function(err,resp,body){
                //redirects image
                var fileUrl = resp.request.uri.href;
                var fileName = url.parse(fileUrl).pathname.split('/').pop().split('?').shift();
                //in wget we have to escape '&'
                var wget = 'wget -P ' + dlDir + ' ' + fileUrl.replace(/&/g,'\\&') + ' -O ' + dlDir+fileName;
                var child = exec(wget, function(err, stdout, stderr) {
                    if (err){ console.log(stderr); throw err; } 
                    else console.log(fileName + ' downloaded to ' + dlDir);
                    // else console.log(stdout+'; \n '+stderr);
                });
            })
        });        
    });
}());