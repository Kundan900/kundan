const http = require('http');
const https = require('https');
const unblocker = require('unblocker')({});
const fs = require('fs');

const landingPage = fs.readFileSync('index.html')
const adminPage = fs.readFileSync('mrdev/admin.html')
const adminPageRuby = fs.readFileSync('rubyyt/admin.html')
const beta = fs.readFileSync('beta/beta.html')
const pJSON = fs.readFileSync('particles.json');
let hits = 0;

const server = http.createServer(function(req, res) {
  // first let unblocker try to handle the requests
  unblocker(req, res, function(err) {
    // this callback will be fired for any request that unblocker does not serve
    var headers = {
      "content-type": "text/html"
    };

    if (err) {
      res.writeHead(500, headers);
      return res.end(err.stack || err);
    }

    if (req.url == "/") {
      res.writeHead(200, headers);
      return res.end(landingPage);
    } 

    if (req.url == "/mrdev/adminpanel") {
      res.writeHead(200, headers);
      return res.end(adminPage);
    } 

    if (req.url == "/beta") {
      res.writeHead(200, headers);
      return res.end(beta);
    } 

    if (req.url == "/rubyyt/adminpanelruby") {
      res.writeHead(200, headers);
      return res.end(adminPageRuby);
    } 

    else if (req.url == "/particles.json") {
      res.writeHead(200, {
        "content-type": "application/json"
      });
      return res.end(pJSON);
    } else {
      res.writeHead(404, headers);
      return res.end("Error 404: file not found.");
    }
  });
  console.log('User request recieved, hit ' + hits++);
})

server.listen(8080, () => {
  console.log('Server started: https://kundan900.github.io')
});

// setInterval(() => {
// https.get('kundan900.github.io/', (res) => {})
// console.log('ping');
// }, 10000);
