import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style/Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
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
    axios.post(this.props.url, newCard)
      .then((response) => {
        newCard.id = response.data.card.id;
        let { cards } = this.state;
        cards.push(newCard);
        this.setState({ cards });
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

  getErrors = (errors) => {
    console.log(errors);
    this.setState({ errors: errors });
  }

  render() {
    const buildCardElements = () => {
      let allCards = []
      const newCardForm = (<NewCardForm
        key="newCardForm"
        addCardCallback={ this.addCard }
        getErrorsCallback={ this.getErrors }/>);
      allCards.push(newCardForm);
      allCards.push(this.state.cards.map((card) => {
        return (
          <Card
            key={ card.id }
            id={ card.id }
            text={ card.text ? card.text : '' }
            emoji={ card.emoji ? card.emoji : '' }
            onDeleteCallback={ this.deleteCard }
          />
        )
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
          Board: <a href={ this.props.url }>{ this.props.boardName }</a>
        </h2>
        <section className="validation-errors--display">
          { this.state.errors && errors() }
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
        const cards = response.data.map((boardObject) => {
          let card = boardObject['card'];
          card = {
            id: (card.id),
            text: (card.text),
            emoji: (card.emoji)
          }
          return card;
      });
        this.setState({ cards: cards.reverse() });
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
