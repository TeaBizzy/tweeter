$(document).ready(() => {
  // _________________________________________________________________________ //
  // *-------------------------- Declare Varaibles --------------------------* //

  const tweetForm = $('.new-tweet');
  const tweetText = tweetForm.find('textarea');
  const counter = tweetForm.find('.counter');


  // _______________________________________________________________________ //
  // *-------------------------- Register Events --------------------------* //
  
  tweetText.on('input', (event) => {
    const tweetLength = event.target.value.length;
    updateCounter(tweetLength, counter);
  });

  tweetForm.submit(() => updateCounter(0, counter));

  // _______________________________________________________________________ //
  // *----------------------------- Functions -----------------------------* //

  // Updates the text of the counter to show the remaining string length
  const updateCounter = function(length, counter) {
    const maxCharCount = 140;
    const remainingLength = maxCharCount - length;

    // Update counter
    counter.text(remainingLength);

    // Update CSS
    if(remainingLength < 0) {
      counter.addClass('counter-red');
    } else {
      counter.removeClass('counter-red');
    }
  }
});