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
    return (
      <button className="card__tools-button"
        onClick={ () => props.onDeleteCallback(props.id) }>
        X
      </button>
    )
  }

  const displayEdit = () => {
    const { id, text, emoji } = props;
    return (
      <button className="card__tools-button"
        onClick={ () => props.showEditFormCallback( { id, text, emoji }) }>
        Edit
      </button>
    )
  }

  return (
    <section className="card">
      <div className="card__content">
        <div className="card__content-text">
          { props.children }
          { props.text }
        </div>
        <div className="card__content-emoji">
          { displayEmoji() }
          { /* Todo: place form body here */ }
        </div>
      </div>
      <div className="card__tools">
        { props.id !== Infinity && displayEdit() }
        { props.id !== Infinity && displayDelete() }
      </div>
    </section>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  onDeleteCallback: PropTypes.func,
  showEditFormCallback: PropTypes.func
};

export default Card;
