import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

// This is a mock. The HTML is probably incorrect and will need to be changed.
const NewCardForm = (props) => {
  return (
    <section className="new-card-form">
      <section className="new-card-form__header">
      </section>
      <form className="new-card-form__form">
        <label className="new-card-form--label" htmlFor="text">Text</label>
        <textarea className="new-card-form--textarea" name="text"></textarea>
        <label className="new-card-form--select" htmlFor="emoji">Emoji</label>
        <select name="emoji"></select>
        <input className="new-card-form--form-button" type="submit" name="submit" value="Create A New Card!" />
      </form>
    </section>
  )
}

NewCardForm.propTypes = {

};

export default NewCardForm;
