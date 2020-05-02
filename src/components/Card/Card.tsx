import React from "react";
import { PickedCard } from "../../types";

import "./Card.css";

interface CardProps {
  card: PickedCard;
}
const suitGlyph: { [index: string]: string } = {
  spades: "♠",
  diamonds: "♦",
  clubs: "♣",
  hearts: "♥",
};

const Card = ({ card }: CardProps) => {
  const cardClassName = `card ${card.hidden && "card-hidden"} ${
    card.suit === "spades" || card.suit === "clubs" ? "card-black" : "card-red"
  }`;
  return (
    <div className={cardClassName}>
      <div className="card-value">{card.value}</div>
      <div className="card-suit">{suitGlyph[card.suit]}</div>
    </div>
  );
};

export default Card;
