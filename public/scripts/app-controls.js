// _____________________________________________________________________ //
// *--------------------------- Description ---------------------------* //

/*
  Contains all functions that control how the page is navigated or viewed.
*/


// _______________________________________________________________________ //
// *----------------------------- Functions -----------------------------* //

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