import { ScoreElement } from "../../types";

export const areEqualElements = (
  currentElement: ScoreElement,
  previousElement: ScoreElement,
) => {
  if (
    JSON.stringify(currentElement.details) ===
      JSON.stringify(previousElement.details) ||
    JSON.stringify(currentElement.reason) ===
      JSON.stringify(previousElement.reason)
  ) {
    return true;
  }
  return false;
};
