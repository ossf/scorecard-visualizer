import { ScoreElement } from "../../types";

export const areEqualElements = (
  currentElement: ScoreElement,
  previousElement: ScoreElement,
) =>
  JSON.stringify(currentElement.details) ===
    JSON.stringify(previousElement.details) &&
  JSON.stringify(currentElement.reason) ===
    JSON.stringify(previousElement.reason);
