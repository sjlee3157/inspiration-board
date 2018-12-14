import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/Card.css';

const Card = (props) => {
  const displayEmoji = () => {
    const icon = emoji.getUnicode(props.emoji);
    return (icon ? icon : props.emoji)
  };

  const displayDelete = () => {
    if (props.id !== Infinity) {
      return (
        <button className="card__delete-button"
          onClick={ () => props.onDeleteCallback(props.id) }>
          X
        </button>
      )
    }
  }

  return (
    <section className="card">
      <div className="card__content">
        { props.children }
        <div className="card__content-text">
          { props.text }
        </div>
        <div className="card__content-emoji">
          { displayEmoji() }
        </div>
      </div>
      <div className="card__delete">
        { displayDelete() }
      </div>
    </section>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  onDeleteCallback: PropTypes.func
};

export default Card;
