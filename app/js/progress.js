(function() {

  class Progress {
    constructor(total) {
      this.total = total
      this.progress = 0;
    }

    showProgress() {
      if (this.progress == 1) {
        document.querySelector('.progressbar').style.display = 'block';
        document.querySelector('#alert').style.display = 'none';
      }
      let progress_value = (this.progress / this.total) * 100;
      if (progress_value > 100) {
        progress_value = 100;
      }
      document.querySelector('.progress').style.width = progress_value + '%';
    }

    makeProgress() {
      this.progress += 1;
      this.showProgress();
    }
  }

  module.exports = Progress;
})()
