/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Adds all our tweets to the DOM.
// TODO: Reverse the render order.
const renderTweets = function(tweets) {
  const tweetContainer = $('#tweet-container');
  tweetContainer.empty();
  tweets.reverse()
  tweets.forEach(tweet => {
    // Create HTML with the tweet's data
    const $newTweet = createTweetElement(tweet);

    // Insert the HTML into the document
    tweetContainer.append($newTweet);
  });
};

// Returns a populated jQuery HTML template.
const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="left-items">
        <img src="${tweetData.user.avatars}">
        <p>${tweetData.user.name}</p>
      </div>
      <div class="right-items">
        <h4 class="handle">${tweetData.user.handle}</h4>
      </div>
    </header>
    <h4>${safeInput(tweetData.content.text)}</h4>
    <footer>
      <div class="left-items">
        <p class="tweet-age">${timeago.format(tweetData.created_at)}</p>
      </div>
      <div class="right-items">
        <i class="fa-solid fa-flag social-button"></i>
        <i class="fa-solid fa-retweet social-button"></i>
        <i class="fa-solid fa-heart social-button"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
};


// TODO: Refactor the callbacks into functions
const registerEvents = function() {
  // Focuses and empties the tweet area
  $('.new-tweet-button').on('click', () => {
    const tweetBox = $('.new-tweet').find('textarea');
    tweetBox.focus();
  })

  $('.new-tweet').submit(function(event) {
    event.preventDefault();
    const text = $(this).serialize();
    const textarea = $(this).find('textarea');
    const tweetContent = textarea.val();

    const errorMessage = $('.error');
    if (typeof tweetContent !== 'string') {
      errorMessage.text('No tweet message!');
      errorMessage.show();
      return;
    }

    if (tweetContent.length > 140) {
      errorMessage.text('Tweet too long!');
      errorMessage.show();
      return;
    }

    if (tweetContent.length <= 0) {
      errorMessage.text('Tweet is empty!');
      errorMessage.show();
      return;
    }
    
    errorMessage.hide();
    textarea.val('');
    $.post('/tweets/', text)
    .then(() => {
      loadTweets();
    });
  });
};

const loadTweets = function() {
  $.get('/tweets/')
    .then((data) => {
      renderTweets(data);
    });
};

const safeInput = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Wait for the document to be 'ready'
$(document).ready(() => {
  $('.error').hide();
  registerEvents();
  loadTweets();
});