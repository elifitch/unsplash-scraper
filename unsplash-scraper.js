var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var exec = require('child_process').exec;

(function() {
    var dlDir = './downloads/';
    var host = 'http://unsplash.com';
    
    request(host, function(err, resp, body) {
        if (err) throw err;

        $ = cheerio.load(body);
        $('.photo a').each(function(){
            var dlPage = $(this).attr('href');

            request(host+dlPage,function(err,resp,body){
                //redirects image
                var fileUrl = resp.request.uri.href;
                var fileName = url.parse(fileUrl).pathname.split('/').pop().split('?').shift();
                //in curl we have to escape '&' from fileUrl
                var curl =  'curl ' + fileUrl.replace(/&/g,'\\&') +' -o ' + dlDir+fileName + ' --create-dirs';
                var child = exec(curl, function(err, stdout, stderr) {
                    if (err){ console.log(stderr); throw err; } 
                    else console.log(fileName + ' downloaded to ' + dlDir);
                });
            })
        });        
    });
}());