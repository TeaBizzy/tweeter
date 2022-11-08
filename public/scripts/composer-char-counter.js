$(document).ready(function() {
  console.log('ready!')

  const counter = $('.counter');
  const maxCharCount = 140

  $('#tweet-text').on('input', function(event) {
    console.log(maxCharCount - $(this).val().length);
    const value = maxCharCount - $(this).val().length;
    $(counter).text(value);
    if(value < 0) {
      $(counter).css('color', 'red');
    } else {
      $(counter).css('color', '#545149');
    }
  });
});