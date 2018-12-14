import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/NewCardForm.css';
import Card from './Card';

const EMOJI_LIST = ['', ...emoji.names];

// const EMOJI_LIST = ["", "poop", "heart_eyes", "skull", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      text: '',
      emoji: ''
    })
  }

  onFormChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { text, emoji } = this.state;
    if (text === '' || emoji === '') return;

    const newCard = {
      ...this.state,
      id: this.props.nextCardId
    }

    this.props.addCardCallback(newCard);
    this.resetState();
  }

  resetState = () => {
    this.setState({
      text: '',
      emoji: ''
    });
  }

  displayEmoji = (unicode) => {
    const icon = emoji.getUnicode(unicode);
    return (icon ? icon : unicode)
  };

  render() {

    const { text, emoji } = this.state;

    const getEmojiOptions = EMOJI_LIST.map((unicode) => {
      return (
        <option key={ unicode} value={ unicode }>{ this.displayEmoji(unicode) } { unicode }</option>
      )
    })
    return (
      <Card text="" emoji="">
        <section className="new-card-form">
          <section className="new-card-form__header">
            Create A New Card
          </section>
          <form className="new-card-form__form" onSubmit={ this.onSubmitHandler }>
            <label className="new-card-form__label" htmlFor="text">Text</label>
              <textarea className="new-card-form__textarea" name="text" onChange={ this.onFormChange } value={ text }></textarea>
            <label className="new-card-form__select" htmlFor="emoji">Emoji</label>
              <select name="emoji" onChange={ this.onFormChange }>
                { getEmojiOptions }
              </select>
            <input className="new-card-form__form-button" type="submit" name="submit" value="Pin It!" />
          </form>
        </section>
      </Card>
    )
  }
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func,
  nextCardId: PropTypes.number.isRequired
};

export default NewCardForm;
