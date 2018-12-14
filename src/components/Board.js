import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style/Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    };
  }

  render() {
    const getCards = CARD_DATA.cards.map((card, i) => {
        return (
          <Card
            key={ i }
            text={ card.text ? card.text : '' }
            emoji={ card.emoji ? card.emoji : '' }
          />
        )
      });

    return (
      <div>
        Boards: <a href={ this.props.url }>{ this.props.boardName }</a>
        { getCards }
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
