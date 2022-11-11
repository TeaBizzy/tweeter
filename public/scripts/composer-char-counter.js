// _______________________________________________________________________ //
// *----------------------------- Constants -----------------------------* //

const counter = $('.new-tweet').find('.counter');


// _______________________________________________________________________ //
// *----------------------------- Functions -----------------------------* //

// Updates the text of the counter to show the remaining string length
const updateCounter = function(length = 0) {
  const maxCharCount = 140;
  const remainingLength = maxCharCount - length;

  // Update counter
  counter.text(remainingLength);

  // Update CSS
  if (remainingLength < 0) {
    counter.addClass('counter-red');
  } else {
    counter.removeClass('counter-red');
  }
};