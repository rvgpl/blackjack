import React, { useState, useEffect } from "react";
import { deck as defaultDeck, Card } from "../../constants/deck";

const Main = () => {
  const [deck, setDeck] = useState<Card[]>(defaultDeck);

  enum CardType {
    Player,
    Dealer,
    Hidden,
  }

  interface PickedCard extends Card {
    hidden: boolean;
  }

  // Player Cards
  const [playerCards, setPlayerCards] = useState<PickedCard[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(0);

  // Dealer Cards
  const [dealerCards, setDealerCards] = useState<PickedCard[]>([]);
  const [dealerCount, setDealerCount] = useState<number>(0);

  useEffect(() => {
    drawCard(CardType.Player);
    drawCard(CardType.Player);
    drawCard(CardType.Dealer);
    drawCard(CardType.Hidden);
  }, []);

  const getAceValue = (count: number) => {
    if (count + 11 >= 21) {
      return 1;
    } else {
      return 11;
    }
  };

  const getCount = (count: number = 0, card: Card): number => {
    switch (card.value) {
      case "A":
        count = getAceValue(count);
        break;
      case "K":
        count += 10;
        break;
      case "Q":
        count += 10;
        break;
      case "J":
        count += 10;
        break;
      default:
        count += Number(card.value);
        break;
    }
    return count;
  };

  const drawCard = (cardType: CardType) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];

      let modifiedDeck = deck;
      modifiedDeck.splice(randomIndex, 1);

      setDeck([...modifiedDeck]);
      setCard(cardType, card);
    } else {
      alert("All cards have been drawn");
    }
  };

  const setCard = (cardType: CardType, card: Card) => {
    switch (cardType) {
      case CardType.Player:
        const playerCard = [{ ...card, hidden: false }];
        setPlayerCount(getCount(playerCount, card));
        setPlayerCards((prevState) => [...prevState, ...playerCard]);
        break;

      case CardType.Dealer:
        const dealerCard = [{ ...card, hidden: false }];
        setDealerCount(getCount(dealerCount, card));
        setDealerCards((prevState) => [...prevState, ...dealerCard]);
        break;

      case CardType.Hidden:
        const hiddenCard = [{ ...card, hidden: true }];
        setDealerCount(getCount(dealerCount, card));
        setDealerCards((prevState) => [...prevState, ...hiddenCard]);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <h1>Renders</h1>
      {deck.length}
      <div>
        <h3>Player Cards ({playerCount})</h3>
        <ul>
          {playerCards.length > 0 &&
            playerCards.map((card: PickedCard) => (
              <li>
                {card.value} - {card.suit}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3>Dealer Cards ({dealerCount})</h3>
        <ul>
          {dealerCards.length > 0 &&
            dealerCards.map((card: PickedCard) => (
              <li>
                {card.value} - {card.suit} {card.hidden && " - hidden"}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
