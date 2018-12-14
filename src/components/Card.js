import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/Card.css';

const displayEmoji = (unicode) => { return emoji.getUnicode(unicode) };

const Card = (props) => {
    return (
      <section className="card">
        <div className="card__content">
          <div className="card__content-text">
            { props.text }
          </div>
          <div className="card__content-emoji">
            { displayEmoji(props.emoji) }
          </div>
          <div className="card__delete">
          </div>
        </div>
      </section>
    )
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired
};

export default Card;
