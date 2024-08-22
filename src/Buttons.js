import React from 'react';

function Buttons({ onComment, comment, counters, onCounterUpdate }) {
  const { upvote, downvote, comment: commentCount } = counters;

  const handleClick = (buttonType, message) => {
    if (buttonType === 'comment') {
      if (comment.trim() !== '') {
        onComment();
        alert(`Comment submitted: ${comment}`);
      } else {
        alert('Please enter a comment before submitting.');
      }
    } else {
      alert(message);
      onCounterUpdate(buttonType);
    }
  };

  return (
    <div>
      <button onClick={() => handleClick('upvote', 'Post upvoted!')}>
        Upvote ({upvote})
      </button>
      <button onClick={() => handleClick('downvote', 'Post downvoted!')}>
        Downvote ({downvote})
      </button>
      <button onClick={() => handleClick('comment')}>
        Comment ({commentCount})
      </button>
    </div>
  );
}

export default Buttons;