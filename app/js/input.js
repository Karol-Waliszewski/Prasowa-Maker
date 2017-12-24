(function() {

  var Input = function(id, toChange) {

    // Functions
    this.updateAmount = function(func) {
      // DOM Cache
      var $input = document.getElementById(id);
      let value = $input.value;
      func()
    }

    // Listener
    document.getElementById(id).addEventListener('change', function() {
      updateAmount(toChange);
      console.log(toChange);
    });
  }

  module.exports = Input;

})()
