/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test code
// TODO: Remove this
const tweet = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

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
        <p class="tweet-age">${tweetData.created_at}</p>
      </div>
      <div class="right-items">
        <i class="fa-solid fa-flag social-button"></i>
        <i class="fa-solid fa-retweet social-button"></i>
        <i class="fa-solid fa-heart social-button"></i>
      </div>
    </footer>
  </article>`)
  return $tweet;
};

// Test code
// TODO: Remove
const $tweet = createTweetElement(tweet);
console.log($tweet);

$(document).ready(() => {
  $('main').append($tweet);
})