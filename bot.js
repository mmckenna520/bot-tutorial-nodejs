var HTTPS = require('https');
var cool = require('cool-ascii-faces');
//myiddd = 39318628;
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/facetest$/;
      botRegexSTRIKE = /^\/two$/;
      botRegexJokes = /tell me a joke/i;
      botRegexQuote = /^\/Bartquote$/;
  
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 
  else if(request.text && botRegexSTRIKE.test(request.text) && request.user_id == "39318628") {
    this.res.writeHead(200);
    postMessagetwo();
    this.res.end();
  }
  else if(request.text && botRegexJokes.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessagetwo(randomJoke());
    this.res.end();
  }
  else if(request.text && botRegexQuote.test(request.text.toLowerCase())) {
    this.res.writeHead(200);
    postMessagetwo(randomQuote());
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
function randomJoke() {
  var jokes = [
  'Today, my son asked "Can I have a book mark?" and I burst into tears. 11 years old and he still doesn\'t know my name is Brian.',
  'Did you know the first French fries weren\'t actually cooked in France? They were cooked in Greece.',
  'If a child refuses to sleep during nap time, are they guilty of resisting a rest?',
  'The secret service isn\'t allowed to yell "Get down!" anymore when the president is about to be attacked. Now they have to yell "Donald, duck!"',
  'What do you call someone with no body and no nose? Nobody knows.',
  'I ordered a chicken and an egg from Amazon. I’ll let you know',
  'What is the least spoken language in the world? Sign language.',
  'My daughter screeched, "Daaaaaad, you haven\'t listened to one word I\'ve said, have you!?" What a strange way to start a conversation with me...',
  'Justice is a dish best served cold, if it were served warm it would be justwater.',
  'The fattest knight at King Arthur’s round table was Sir Cumference. He acquired his size from too much pi.',
  'If you see a robbery at an Apple Store does that make you an iWitness?',
  'Did you hear the news? FedEx and UPS are merging. They’re going to go by the name Fed-Up from now on.',
  'What did the pirate say on his 80th birthday? AYE MATEY',
  'What\'s the best part about living in Switzerland? I don\'t know, but the flag is a big plus.',
  'What do you call a dog that can do magic? A Labracadabrador.',
  '5/4 of people admit that they’re bad with fractions.',
  'I used to have a job at a calendar factory but I got the sack because I took a couple of days off.',
  'What is Beethoven’s favorite fruit? A ba-na-na-na.',
  'You know what the loudest pet you can get is? A trumpet.',
  'Why wasn\'t the woman happy with the velcro she bought? It was a total ripoff.',
  'Did you hear about the circus fire? It was in tents!',
  'Want to hear a joke about a piece of paper? Never mind... it\'s tearable.',
  'If you rearrange the letters of “Postmen”. They get really mad.',
  'I had a dream that I was a muffler last night. I woke up exhausted!',
  'Did you see they made round bails of hay illegal in Wisconsin? It’s because the cows weren’t getting a square meal.',
  'What do prisoners use to call each other? Cell phones.'
  ]
  var randomItem = jokes[Math.floor(Math.random()*jokes.length)];
  return randomItem
}

function randomQuote() {
  var quotes = [
  'There is nothing wrong with punching a hole in sofie\'s wall.',
  'I cannot wait to hurt someone during a light drill in practice today.',
  'Beer is cool and all, but have you ever sipped on a Smirnoff Ice?',
  'I can\'t hear you over the sound of me getting angry at the guys playing crickett.',
  'If I get hit in the head with one more soccer ball, I\'m going to have a spaz attack.',  
  'Yeah I\'m the RA for this dorm, the Real A-Hole .'
  ]
  var randomItem = quotes[Math.floor(Math.random()*quotes.length)];
  return randomItem
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
    "text" : botResponse
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

function postMessagetwo(response) {
  var botResponse, options, body, botReq;

  botResponse = response;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.respond = respond;
