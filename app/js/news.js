var News = (function() {

  // Requirements
  const cheerio = require('cheerio');
  const rp = require('request-promise');
  const fs = require('fs');
  const Progress = require('./progress');

  // Variables
  var progress = null;

  // Methods
  var newsReady = function() {
    let notification = new Notification('Prasowka gotowa!');
    setTimeout(function() {
      document.getElementById('alert').style.display = 'block';
      document.querySelector('.progressbar').style.display = 'none';
    }, 1100)
  };

  var resetFile = (folder, file) => {
    if (!fs.existsSync('./' + folder)) {
      fs.mkdirSync('./' + folder);
    }
    fs.writeFileSync('./' + folder + '/' + file, '');
  };

  var saveNews = (folder, file, content) => {
    fs.appendFileSync('./' + folder + '/' + file, content);
  };

  var getNews = ({
    url,
    category,
    amount,
    perPage,
    folder,
    file,
    nextFunction,
    reset
  }) => {

    if (typeof nextFunction == 'undefined') {
      progress = new Progress(amount);
    } else {
      progress = new Progress(amount * 2);
    }

    if (reset) {
      resetFile(folder, file);
    }

    let loops = Math.ceil(amount / perPage);

    for (let i = 1; i <= loops; i++) {
      // Calling request
      rp({
          uri: url + category + '/page/' + i,
          transform: function(body) {
            return cheerio.load(body);
          }
        })
        .then(function($) {

          let articles = $('.clearfix>.cb-post-title a');
          let articlesUrls = articles.map(function() {
            return $(this).attr('href');
          });

          let loopAmount = (i == loops) ? (amount % perPage) : perPage;
          if (loopAmount == 0) {
            loopAmount = perPage;
          }

          for (let j = 0; j < loopAmount; j++) {
            // Calling request
            rp({
                uri: articlesUrls[j],
                transform: function(body) {
                  return cheerio.load(body);
                }
              })
              .then(function($$) {

                // Getting content to file
                let heading = $$('.entry-title.cb-entry-title.cb-title').text();
                let content = $$('article p').text();

                // Saving content to file
                saveNews(folder, file, heading + '\r\n');
                saveNews(folder, file, content + '\r\n\r\n');

                // Checking for finish TODO Check if works
                if (i == loops && j == loopAmount - 1 && typeof nextFunction != 'undefined') {
                  // Calls next part of getting news
                  nextFunction();
                } else if (i == loops && j == loopAmount - 1) {
                  // Inform when news are ready to print!
                  newsReady();
                }
                progress.makeProgress();
              })
              .catch(function(err) {
                throw new Error(err);
              });
          }
        })
        .catch(function(err) {
          throw new Error(err);
        });

    }
  }

  // Return
  return {
    getNews
  }

})();

module.exports = News;
