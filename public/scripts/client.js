/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test code
// TODO: Remove this
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// Adds all our tweets to the DOM.
const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    // Create HTML with the tweet's data
    const $newTweet = createTweetElement(tweet);

    // Insert the HTML into the document
    $('main').append($newTweet);
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
    <h4>${tweetData.content.text}</h4>
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

const registerEvents = function() {
  $('.new-tweet').submit(function(event) {
    event.preventDefault();
    const text = $(this).serialize();

    const tweetContent = $(this).find('textarea').val();

    if (typeof tweetContent !== 'string') {
      alert('No tweet message!');
      return;
    }

    if (tweetContent.length > 140) {
      alert('Tweet to long!');
      return;
    }

    if (tweetContent.length <= 0) {
      alert('Tweet is empty!');
      return;
    }

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

// Wait for the document to be 'ready'
$(document).ready(() => {
  registerEvents();
  loadTweets();
});