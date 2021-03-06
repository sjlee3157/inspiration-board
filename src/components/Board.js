import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style/Board.css';
import Card from './Card';
import CardForm from './CardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      errors: {}
    };
  }

  addCard = (newCard) => {
    const { text, emoji } = newCard;
    axios.post(this.props.url, { text, emoji })
      .then((response) => {
        newCard.id = response.data.card.id;
        let { cards, errors } = this.state;
        cards = [ newCard, ...cards ]
        errors = {};
        this.setState({ cards, errors });
        console.log(`Successfully added card ${newCard.id}`);
      })
      .catch((error) => {
        console.log(`Error adding new card: ${error.response.data.cause}`);
      })
  }

  deleteCard = (id) => {
    const url = 'https://inspiration-board.herokuapp.com/cards/' + id
    console.log(`Attempting to delete card ${id}`)
    axios.delete(url)
      .then((response) => {
        let { cards } = this.state;
        let cardIndex = undefined;
        cards.forEach((card, i) => {
          if (card.id === id ) { cardIndex = i}
        })
        cards.splice(cardIndex, 1);
        this.setState({ cards });
        console.log(`Successfully deleted card ${response.data.card.id}`);
      })
      .catch((error) => {
        console.log(`Error deleting card: ${error.response.data.cause}`);
      })
  }

  editCard = (cardPatch, ) => {
    if (cardPatch.callback === 'no-edit') {
      let { cards } = this.state;
      let cardIndex = undefined;
      cards.forEach((card, i) => {
        if (card.id === cardPatch.id) {
          cardIndex = i
        }
      })
      cards[cardIndex] = cardPatch
      this.setState({ cards });
      console.log(`No patch request was made for card ${cardPatch.id}`)
    } else {
      const url = 'https://inspiration-board.herokuapp.com/cards/' + cardPatch.id
      console.log(`Attempting to edit card ${cardPatch.id}`)
      const { text, emoji } = cardPatch;
      axios.patch(url, { text, emoji } )
        .then((response) => {
          let { cards } = this.state;
          let cardIndex = undefined;
          cards.forEach((card, i) => {
            if (card.id === cardPatch.id) {
              cardIndex = i
            }
          })
          cards[cardIndex] = cardPatch
          this.setState({ cards });
          console.log(`Successfully edited card ${response.data.card.id}`);
        })
        .catch((error) => {
          console.log(`Error editing card: ${error.response.data.cause}`);
        })
    }
  }

  getErrors = (errors) => {
    console.log(errors);
    this.setState({ errors: errors });
  }

  showEditForm = (cardPatch) => {
    console.log(`Attempting to render edit form for card ${cardPatch.id}`);
    let { cards } = this.state;
    cards.forEach((card) => {
      if (card.id === cardPatch.id) {
        card.cardType_isEditCard = true;
      }
    } )
    this.setState({ cards });
  }

  render() {
    const buildCardElements = () => {
      let allCards = []
      const newCardForm = (
        <CardForm
          key="newCardForm"
          addCardCallback={ this.addCard }
          getErrorsCallback={ this.getErrors }
          formType_isNewForm={ true }
        />);
      allCards.push(newCardForm);
      allCards.push(this.state.cards.map((card) => {
        if (card.cardType_isEditCard) {
          return (
            <CardForm
              key="editCardForm"
              id={ card.id }
              text={ card.text }
              emoji={ card.emoji }
              editCardCallback={ this.editCard }
              getErrorsCallback={ this.getErrors }
              formType_isEditForm={ true }
            />
          )
        } else {
          return (
          <Card
            key={ card.id }
            id={ card.id }
            text={ card.text ? card.text : '' }
            emoji={ card.emoji ? card.emoji : '' }
            onDeleteCallback={ this.deleteCard }
            onEditCallback={ this.editCard }
            showEditFormCallback={ this.showEditForm }
            cardType_isBasicCard={ true }
          />
        )}
      }));
      return allCards;
    }

    const errors = () => {
      let { errors } = this.state;
      const errorsList = Object.keys(errors).map((type) => {
        return (<li key={ type }><strong>{ type } error:</strong> { errors[type] }</li>)
      });
      return (
        <ul className="validation-errors-display__list"> { errorsList }</ul>
      )
    }

    return (
      <section>
        <h2>
          Board Name: { this.props.boardName }
        </h2>
        <section className="validation-errors--display">
          { this.state.errors && errors() }
          { /* TODO: status messages */ }
        </section>
        <section className="board">
          { this.state.cards.length > 0 && buildCardElements() }
        </section>
      </section>
    )
  }

  componentDidMount() {
    axios.get( this.props.url )
      .then((response) => {
        let cards = response.data.map((boardObject) => {
          let card = boardObject['card'];
          card = {
            id: (card.id),
            text: (card.text),
            emoji: (card.emoji)
          }
          return card;
      });
        cards = cards.sort((a, b) => { return a.id - b.id }).reverse();
        this.setState({ cards });
        console.log(`Successfully loaded ${cards.length} cards`);
      })
      .catch((error) => {
        console.log(`Error loading cards: ${error.response.data.cause}`);
      });
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
