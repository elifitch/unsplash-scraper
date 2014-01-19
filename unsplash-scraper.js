var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var exec = require('child_process').exec;

(function() {
    var dlDir = './downloads';
    var host = 'http://unsplash.com/';
    //grabs all images and stores in array
    request(host, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('.photo_div img').each(function(){
            var fileUrl = $(this).attr('src');
            var fileName = url.parse(fileUrl).pathname.split('/').pop();
            var wget = 'wget -P ' + dlDir + ' ' + fileUrl;
            var child = exec(wget, function(err, stdout, stderr) {
                if (err) throw err;
                else console.log(fileName + ' downloaded to ' + dlDir);
            });
        });        
    });
}());