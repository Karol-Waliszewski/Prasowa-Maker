const News = require('./news');
const Config = require('./config');
const path = require('path');
const {
  shell
} = require('electron');

// Variables
var file = Config.get('NEWS_FILE');

// Functions
var updateAmount = function() {
  // DOM Cache
  var $input = document.getElementById('newsamount');
  let value = $input.value;
  Config.set('NEWS_AMOUNT', value);
}

// Listeners
document.getElementById('all').addEventListener('click', function() {
  file = Config.get('NEWS_FILE');
  News.getNews({
    url: Config.get('URL'),
    category: 'polska',
    amount: Config.get('NEWS_AMOUNT'),
    perPage: 7,
    folder: Config.get('NEWS_FOLDER'),
    file: Config.get('NEWS_FILE'),
    nextFunction: function() {
      News.getNews({
        url: Config.get('URL'),
        category: 'swiat',
        amount: Config.get('NEWS_AMOUNT'),
        perPage: 7,
        folder: Config.get('NEWS_FOLDER'),
        file: Config.get('NEWS_FILE'),
        reset: false
      });
    },
    reset: true
  });
});
document.getElementById('pl').addEventListener('click', function() {
  file = 'polska-' + Config.get('NEWS_FILE');
  News.getNews({
    url: Config.get('URL'),
    category: 'polska',
    amount: Config.get('NEWS_AMOUNT'),
    perPage: 7,
    folder: Config.get('NEWS_FOLDER'),
    file: 'polska-' + Config.get('NEWS_FILE'),
    reset: true
  });
});
document.getElementById('wrld').addEventListener('click', function() {
  file = 'swiat-' + Config.get('NEWS_FILE');
  News.getNews({
    url: Config.get('URL'),
    category: 'swiat',
    amount: Config.get('NEWS_AMOUNT'),
    perPage: 7,
    folder: Config.get('NEWS_FOLDER'),
    file: 'swiat-' + Config.get('NEWS_FILE'),
    reset: true
  });
});

document.getElementById('file').addEventListener('click', function() {
  shell.openItem(path.resolve(path.join('./', Config.get('NEWS_FOLDER'), '/', file)));
});

document.getElementById('folder').addEventListener('click', function() {
  shell.openItem(path.resolve('./', Config.get('NEWS_FOLDER')));
});

document.querySelector('.footer__link').addEventListener('click', function() {
  shell.openExternal('https://karol-waliszewski.github.io/');
});

document.getElementById('newsamount').addEventListener('change', function() {
  updateAmount();
  Config.get('NEWS_AMOUNT');
});
