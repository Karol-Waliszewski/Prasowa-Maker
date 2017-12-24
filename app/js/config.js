var Config = (function() {

  // Variables
  let today = new Date();

  // Properties
  this.URL = 'http://prasowki.org/category/';
  this.FILE_FORMAT = '.txt';
  this.NEWS_FOLDER = 'prasowki';
  this.NEWS_FILE = 'prasowka-' + today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + FILE_FORMAT;
  this.NEWS_AMOUNT = 5;
  this.NEWS_PER_PAGE = 7;

  // Methods
  var set = (property, value) => {
    this[property] = value;
    return true;
  };

  var get = (property) => {
    return this[property];
  };

  // Return
  return {
    set,
    get
  }
})();

// Export
module.exports = Config;
