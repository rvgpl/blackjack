import React from "react";
import "./Hand.css";
import { PickedCard } from "../../types";

interface HandProps {
  count: number;
  cards: PickedCard[];
}
const Hand = ({ count, cards }: HandProps) => {
  return (
    <div>
      <h3>number of cards ({count})</h3>
      <ul>
        {cards.length > 0 &&
          cards.map((card: PickedCard) => (
            <li>
              {card.value} - {card.suit}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Hand;
