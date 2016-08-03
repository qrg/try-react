'use strict';

// https://facebook.github.io/react/docs/tutorial.html#your-first-component

import React from 'react';
import ReactDOM from 'react-dom';

const CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
      Hello, world! I am a CommentBox.
    </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
