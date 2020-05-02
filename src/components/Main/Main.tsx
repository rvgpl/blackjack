import React from "react";
import { deck } from "../../constants/deck";

const Main = () => {
  return (
    <div>
      <h1>Renders</h1>
      {deck.length}
      {deck.map((card) => (
        <h4>{card.value}</h4>
      ))}
    </div>
  );
};

export default Main;
