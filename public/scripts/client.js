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
    const tweetForm = $('.new-tweet');
    tweetForm.animate({height: "toggle"}, 500);
    tweetBox.focus();
  })

  $('.new-tweet').submit(function(event) {
    event.preventDefault();
    const text = $(this).serialize();
    const textarea = $(this).find('textarea');
    const tweetContent = textarea.val();

    const errorBox = $('#error-box');
    const errorMessage = errorBox.find('h5');
    if (typeof tweetContent !== 'string') {
      errorBox.slideToggle(500)
      errorMessage.text('No tweet message!');
      errorBox.show();
      return;
    }

    if (tweetContent.length > 140) {
      errorBox.slideToggle(500)
      errorMessage.text('Tweet too long!');
      errorBox.show();
      return;
    }

    if (tweetContent.length <= 0) {
      errorBox.slideToggle(500)
      errorMessage.text('Tweet is empty!');
      errorBox.show();
      return;
    }
    
    $(this).trigger('success');
    errorBox.hide();
    textarea.val('');
    $.post('/tweets/', text)
    .then(() => {
      loadTweets();
    });
  });

  $(window).scroll(() => {
    if($('html').scrollTop() > 0) {
      $('#to-top-button').show();
    } else {
      $('#to-top-button').hide();
    }
  });

  $('#to-top-button').on('click', () => {
    $('html').scrollTop(0);
  })
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
  $('#error-box').slideToggle(0);
  $('#to-top-button').hide();
  registerEvents();
  loadTweets();
});