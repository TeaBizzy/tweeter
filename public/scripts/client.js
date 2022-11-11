// _____________________________________________________________________ //
// *--------------------------- Description ---------------------------* //

/*
  Initializes the web app for use by the client, hides any elements that shouldn't be shown initially.
  Registers all our events, and delegates loading tweets.
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