import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style/Board.css';
import Card from './Card';
// import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  render() {
    const getCards = this.state.cards.map((card, i) => {
        return (
          <Card
            key={ card.id ? card.id : `${i}` + card.text + card.emoji}
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
          cards: apiCards
        });
        console.log(`Successfully loaded ${apiCards.length} cards`)
      })
      .catch((error) => {
        console.log(`Error loading cards: ${error.response.data.cause}`);
      })
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
