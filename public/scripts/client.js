// _____________________________________________________________________ //
// *--------------------------- Description ---------------------------* //

/*
  Initializes the web app for use by the client.
  Hides any elements that shouldn't be shown initially.
  Registers all our events.
  Delegates loading tweets.
*/

// ______________________________________________________________________ //
// *-------------------------- Document Ready --------------------------* //

$(document).ready(() => {
  // Hide elements that should be hidden on load.
  $('#error-box').slideToggle(0);
  $('#to-top-button').hide();

  // Register events
  registerEvents();

  // Load tweets
  loadTweets();
});


// _______________________________________________________________________ //
// *-------------------------- Register Events --------------------------* //

const registerEvents = function() {
  const tweetButton = $('.new-tweet-button');
  const tweetForm = $('.new-tweet');
  const toTopButton = $('#to-top-button');

  // _______________________________ //
  //* ------ Document Events ------ *//
  $(document).scroll(toggleScrollTopButton);

  // _______________________________ //
  //* ----- Navigation Events ----- *//
  tweetButton.on('click', toggleTweetForm);
  toTopButton.on('click', () => $('html').scrollTop(0));

  // _______________________________ //
  //* ----- User Input Events ----- *//
  tweetForm.submit(submitTweet);
  tweetForm.on('input', (event) => {
    const tweetLength = event.target.value.length;
    updateCounter(tweetLength);
  });
};


// _______________________________________________________________________ //
// *-------------------------- Event Functions --------------------------* //

// Toggles the return to top button
const toggleScrollTopButton = function() {
  const button = $('#to-top-button');
  const document = $('html');
  if (document.width() >= 768 && document.scrollTop() > 200) {
    button.show();
  } else if (document.scrollTop() > 600) {
    button.show();
  } else {
    button.hide();
  }
};

// Focuses and toggles the tweet
const toggleTweetForm = function() {
  const tweetBox = $('.new-tweet').find('textarea');
  const tweetForm = $('.new-tweet');
  tweetForm.slideToggle(500);
  tweetBox.focus();
};

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