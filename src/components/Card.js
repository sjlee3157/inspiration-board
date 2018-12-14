import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/Card.css';

const Card = (props) => {
    return (
      <div className="card">
        { props.text }
        { props.emoji }
      </div>
    )
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired
};

export default Card;
