require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var validUrl=require("valid-url");
var http = require('http');
var bodyParser = require("body-parser");
var middle=bodyParser.urlencoded({extended: false});
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
var mapper=["nil"];
app.post('/api/shorturl', middle,function(req, res) {
  const url=req.body.url;
  if(validUrl.isHttpsUri(url)){
     
  var sUrl=mapper.length;
  mapper.push(url);
  res.send({original_url:url,short_url:sUrl});
  }
  else{
    res.send({error:"invalid url"})
  }
});
app.get('/api/shorturl/:short',function(req,res){
  const srt=parseInt(req.params.short);
  var link=mapper[srt];
  res.writeHead(301,{Location: link});
  res.end();
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
