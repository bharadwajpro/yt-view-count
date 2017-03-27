var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Setting up Webpack for Node.js
var webpack = require("webpack");
var webpack_config = require('./webpack.config');
var compiler = webpack(webpack_config);

compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
}, function(err, stats) {
    if(err) console.log('Webpack error occured');
    else console.log(stats.toString({colors: true}));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('src'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function parseData(id, callback) {
    var vid_metadata = [];
    var url = "https://youtube.com/watch?v="+id;
    vid_metadata.push("https://i.ytimg.com/vi/"+id+"/default.jpg");

    request(url, function (err, response, html) {
        if(!err)
        {
            var $ = cheerio.load(html);
            vid_metadata.push($('title').text());
            vid_metadata.push($('.watch-view-count').html());
            callback(vid_metadata);
        }
        else console.log("Error occured! " + err);
    });
}

app.get('/', function (req, res) {
  res.sendFile('index.html', function (err) {
      if(err){
          console.log('Error sending / ', err);
      }
      console.log('Sent index.html');
  });
});

app.post('/video', (req, res) => {
    var data = req.body;
    var vid = data['vid'];
    console.log("Request received " + new Date());
    parseData(vid, function (data) {
        send_data = {};
        send_data['thumbnail'] = data[0];
        send_data['title'] = data[1];
        send_data['views'] = data[2];
        res.send(send_data);
    });
});

app.listen(process.env.PORT || 8081, function(){
    console.log("Server started on port ", process.env.PORT || 8081);
});
