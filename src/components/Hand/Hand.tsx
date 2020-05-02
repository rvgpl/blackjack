import React from "react";
import "./Hand.css";
import { PickedCard, HandType } from "../../types";
import Card from "../Card/Card";

interface HandProps {
  handType: HandType;
  count: number;
  cards: PickedCard[];
}
const Hand = ({ handType, count, cards }: HandProps) => {
  return (
    <div className="hand-container">
      <h3 className="hand-count">{`${handType} (${count})`}</h3>
      <ul className="hand-cards-container">
        {cards.length > 0 &&
          cards.map((card: PickedCard) => (
            <li key={card.value}>
              <Card card={card} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Hand;
