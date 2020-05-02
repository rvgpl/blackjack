import { Card } from "../constants/deck";

export const getAceValue = (count: number) => {
  if (count + 11 > 21) {
    return 1;
  } else {
    return 11;
  }
};

export const getCardCount = (count: number = 0, card: Card): number => {
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
