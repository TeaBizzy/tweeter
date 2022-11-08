$(document).ready(function() {
  const maxCharCount = 140

  // Get our JQuery elements
  const tweetForm = $('.new-tweet')
  const tweetText = tweetForm.find('textarea');
  const counter = tweetForm.find('.counter');

  tweetText.on('input', (event) => {
    // Calculate tweet length
    const tweetLength = event.target.value.length;
    const remainingLength = maxCharCount - tweetLength;

    // Update counter
    counter.text(remainingLength);
    
    // Update CSS
    if(remainingLength < 0) {
      counter.addClass('counter-red');
    } else {
      counter.removeClass('counter-red');
    }
  });
});