import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './style/CardForm.css';
import Card from './Card';

const EMOJI_LIST = ['', ...emoji.names];
// const EMOJI_LIST = [
//  "", "poop", "heart_eyes", "skull", "clap", "sparkling_heart",
//  "heart_eyes_cat", "dog"
// ]

class CardForm extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      text: (props.formType_isEditForm ? props.text : ''),
      emoji: (props.formType_isEditForm ? props.emoji : '')
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
    if (text === '' || emoji === '') {
      const errors = {};
      if (text === '') { errors['Text Validation'] = 'You must enter text!' };
      if (emoji === '') { errors['Emoji Validation'] = 'You must select an emoji!' };
      console.log('You have form validation errors')
      return this.props.getErrorsCallback(errors);
    } else {
      const newCard = { ...this.state }
      if (this.props.formType_isEditForm) {
        newCard.id = this.props.id;
        this.props.editCardCallback(newCard);
      } else {
        this.props.addCardCallback(newCard);
      }
      this.resetState();
    }
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

  displayTitle = () => {
    return (this.props.formType_isEditForm ?  'Edit Card' : 'Create A New Card');
  }

  render() {
    const { text, emoji } = this.state;

    const getEmojiOptions = EMOJI_LIST.map((unicode) => {
      return (
        <option key={ unicode} value={ unicode }>
          { this.displayEmoji(unicode) } { unicode }
        </option>
      )
    })
    return (
      <Card text="" emoji="" id={ Infinity }
        cardType_isNewCard={ this.props.formType_isNewForm }
        cardType_isEditCard={ this.props.formType_isEditForm }>
        <section className="new-card-form">
          <section className="new-card-form__header">
            { this.displayTitle() }
          </section>
          <form className="new-card-form__form" onSubmit={ this.onSubmitHandler }>
            <label className="new-card-form__label" htmlFor="text">Text</label>
              <textarea className="new-card-form__textarea" name="text"
                onChange={ this.onFormChange } value={ text }>
              </textarea>
            <label className="new-card-form__label" htmlFor="emoji">Emoji</label>
              <select className="new-card-form__select" name="emoji" onChange={ this.onFormChange } value={ emoji }>
                { getEmojiOptions }
              </select>
            <input className="new-card-form__form-button" type="submit"
              name="submit" value="Pin It!" />
          </form>
        </section>
      </Card>
    )
  }
}

CardForm.propTypes = {
  addCardCallback: PropTypes.func,
  getErrorsCallback: PropTypes.func,
  editCardCallback: PropTypes.func,
  id: PropTypes.number,
  text: PropTypes.string,
  emoji: PropTypes.string,
  formType_isNewForm: PropTypes.bool,
  formType_isEditForm: PropTypes.bool
};

export default CardForm;
