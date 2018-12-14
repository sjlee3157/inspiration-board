import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/Card.css';

const displayEmoji = (unicode) => {
  return `${emoji.getUnicode(unicode)}`;
}

const Card = (props) => {
    return (
      <div className="card">
        { props.text[0] ? props.text : null }
        { props.emoji[0] ? displayEmoji(props.emoji) : null }
      </div>
    )
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired
};

export default Card;
