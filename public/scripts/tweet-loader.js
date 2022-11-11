// _________________________________________________________________________ //
// *------------------------------ Functions ------------------------------* //

// Fetches tweets from server using AJAX
const loadTweets = function() {
  $.get('/tweets/')
    .then((tweets) => renderTweets(tweets));
};

// Adds all tweets to DOM.
const renderTweets = function(tweets) {
  // Get the element to append tweets to
  const tweetContainer = $('#tweet-container');

  // Clear our container
  tweetContainer.empty();

  // Load tweets from youngest -> oldest
  tweets.reverse();
  tweets.forEach((tweet) => {
    // Create and insert new tweet elements to DOM
    const tweetElement = createTweetElement(tweet);
    tweetContainer.append(tweetElement);
  });
};

// Returns a jQuery tweet element
const createTweetElement = function(tweetData) {
  // Declare variables
  const user = tweetData.user;
  let content = tweetData.content.text;
  content = escapeInput(content);

  // create tweet element
  const tweetElement = $(`
  <article class="tweet">
    <header>
      <div class="left-items">
        <img src="${user.avatars}">
        <p>${user.name}</p>
      </div>
      <div class="right-items">
        <h4 class="handle">${user.handle}</h4>
      </div>
    </header>
    <h4>${content}</h4>
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

  return tweetElement;
};


// ________________________________________________________________________ //
// *-------------------------- Helper Functions --------------------------* //


// Wraps user input in a div, nullifying script injection
const escapeInput = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};