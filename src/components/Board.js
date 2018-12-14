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
      maxCardId: 0
    };
  }

  addCard = (newCard) => {
    axios.post(this.props.url, newCard)
      .then((response) => {
        let { cards } = this.state;
        cards.push(newCard);
        this.setState({ cards });
        console.log(`Successfully added card ${newCard.id}`);
      })
      .catch((error) => {
        console.log(`Error adding new card: ${error.response.data.cause}`);
      })
  }

  render() {
    const getCards = this.state.cards.map((card) => {
        return (
          <Card
            key={ card.id }
            text={ card.text ? card.text : '' }
            emoji={ card.emoji ? card.emoji : '' }
          />
        )
      });

    return (
      <section>
        <h2>
          Board: <a href={ this.props.url }>{ this.props.boardName }</a>
        </h2>
        <section className="validation-errors-display">
        </section>
        <section className="board">
          { getCards }
          <NewCardForm
            addCardCallback={ this.addCard }
            nextCardId={ this.state.maxCardId + 1 } />
        </section>
      </section>
    )
  }

  componentDidMount() {
    axios.get( this.props.url )
      .then((response) => {
        const apiCards = response.data.map((boardObject) => {
          let card = boardObject['card'];
          card = {
            id: (card.id),
            text: (card.text),
            emoji: (card.emoji)
          }
          return card;
      });
        this.setState({
          cards: apiCards.sort(apiCards.id).reverse()
        });
        console.log(`Successfully loaded ${apiCards.length} cards`);
        let { cards, maxCardId } = this.state;
        maxCardId = cards.map( card => card.id).reduce((max = 0, cur) => Math.max(max, cur), -Infinity);
        this.setState({ maxCardId })
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
