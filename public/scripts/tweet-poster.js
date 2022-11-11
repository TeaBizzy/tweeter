// _____________________________________________________________________ //
// *--------------------------- Description ---------------------------* //

/*
  Responsible for sending user tweet input to the server using AJAX
.*/


// _______________________________________________________________________ //
// *----------------------------- Functions -----------------------------* //

// Verifies tweet input, and sends it to the server.
const submitTweet = function(event) {
  // Stop page from refreshing
  event.preventDefault();
  
  // Assign varaibles
  const tweetForm = $('.new-tweet');
  const textarea = tweetForm.find('textarea');
  const errorBox = $('#error-box');
  const errorMessage = errorBox.find('h5');
  const text = tweetForm.serialize();
  const tweetContent = textarea.val();
  
  // Handle invalid inputs & display errors
  if (tweetContent.length > 140) {
    errorBox.slideToggle(500);
    errorMessage.text('Tweet too long!');
    errorBox.show();
    return;
  }

  if (tweetContent.length <= 0) {
    errorBox.slideToggle(500);
    errorMessage.text('Tweet is empty!');
    errorBox.show();
    return;
  }
  
  // Reset the form
  updateCounter();
  textarea.val('');
  errorBox.hide();

  // Send the tweet to the server using AJAX
  $.post('/tweets/', text)
    .then(loadTweets);
};