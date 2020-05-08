import { getCardCount } from "../utils";
import { CardType, GameState, StatusMessage, PickedCard, Card } from "../types";
import { deck as defaultDeck } from "../constants/deck";

const INITIAL_BOARD_STATE = {
  deck: defaultDeck,
  playerCards: [],
  playerCount: 0,
  dealerCards: [],
  dealerCount: 0,
  dealerScore: 0,
  statusMessage: "",
  gameState: GameState.Init,
};

const determineWinner = (playerScore: number, dealerScore: number) => {
  if ((playerScore > dealerScore && playerScore <= 21) || dealerScore > 21) {
    return StatusMessage.PlayerWins;
  } else if (
    (dealerScore > playerScore && dealerScore <= 21) ||
    dealerScore < 21
  ) {
    return StatusMessage.DealerWins;
  } else {
    return StatusMessage.Tie;
  }
};

const setCard = (cardType: CardType, card: Card, state: any) => {
  switch (cardType) {
    case CardType.Player:
      const playerCard = [{ ...card, hidden: false }];
      return {
        playerCount: getCardCount(state.playerCount, card),
        playerCards: [...state.playerCards, ...playerCard],
      };

    case CardType.Dealer:
      const dealerCard = [{ ...card, hidden: false }];
      return {
        dealerCount: getCardCount(state.dealerCount, card),
        dealerScore: getCardCount(state.dealerScore, card),
        dealerCards: [...state.dealerCards, ...dealerCard],
      };

    case CardType.Hidden:
      const hiddenCard = [{ ...card, hidden: true }];
      return {
        dealerScore: getCardCount(state.dealerScore, card),
        dealerCards: [...state.dealerCards, ...hiddenCard],
      };

    default:
      throw new Error(`Unsupported Card Type: ${cardType}`);
  }
};

const boardReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DECK": {
      return { ...state, deck: payload.deck };
    }
    case "DRAW_CARD": {
      const { deck } = state;
      if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomIndex];

        let modifiedDeck = deck;
        modifiedDeck.splice(randomIndex, 1);

        const modifiedCards = setCard(payload.cardType, card, state);
        return { ...state, deck: [...modifiedDeck], ...modifiedCards };
      } else {
        return { ...state, statusMessage: StatusMessage.GameOver };
      }
    }

    case "UPDATE_GAME_STATE": {
      return { ...state, gameState: payload.gameState };
    }

    case "RESET": {
      return INITIAL_BOARD_STATE;
    }

    case "DETERMINE_WINNER": {
      const revealedDealerCards: PickedCard[] = state.dealerCards.map(
        (card: PickedCard) => {
          if (card.hidden === true) {
            card.hidden = false;
          }
          return card;
        }
      );
      const statusMessage = determineWinner(
        state.playerCount,
        state.dealerScore
      );
      return {
        ...state,
        dealerCards: revealedDealerCards,
        dealerCount: state.dealerScore,
        statusMessage: statusMessage,
        gameState: GameState.GameOver,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export { boardReducer, INITIAL_BOARD_STATE };
