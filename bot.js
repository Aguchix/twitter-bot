var twit = require('twit');
var config = require('./config.js');

var T = new twit(config);

var params = {
  q: '#IndioEnOlavarria, se llama',
  count: '1'
}

function dataTweet(err, data) {
  var tweets = data.statuses;
  for(var i = 0; i < tweets.length; i++) {
    if(!err) {
      var retweetId = data.statuses[i].id_str;
      T.post('statuses/retweet/:id', { id: retweetId }, (err, res) => {
        if(err) {
          console.log('error while retweeting');
        }
        if(res) {
          console.log('retweeted!');
        }
      });
    }
    else {
      console.log('error while searching');
    }
  }
}

var retweet = function() {
  T.get('search/tweets', params, dataTweet);
}

retweet();
setInterval(retweet, 300000);
