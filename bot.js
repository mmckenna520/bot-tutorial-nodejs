var HTTPS = require('https');
var cool = require('cool-ascii-faces');
//myiddd = 39318628;
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/facetest$/;
      botRegexSTRIKE = /^\/two$/;
  
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 
  else if(request.text && botRegexSTRIKE.test(request.text) && request.name == "mike") {
    this.res.writeHead(200);
    postMessagetwo();
    this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
  /*
   if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
   {
    "bot_id"  : "1179316f970830de93cc36eb03",
    "text"    : "Hello world"
    }
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
  */ 
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "Hello World"
  };
  

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}
function postMessagetwo() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "test2"
  };
  

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}



exports.respond = respond;
