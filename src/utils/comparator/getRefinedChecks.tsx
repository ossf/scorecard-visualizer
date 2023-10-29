import { ScoreElement } from "../../types";
import { CHECKS_LIST_NAMES } from "../../constants/checks";

export const getRefinedChecks = (
  from: ScoreElement[] = [],
  to: ScoreElement[] = [],
) => {
  const haveMaxChecksNumber =
    from.length === CHECKS_LIST_NAMES.length &&
    to.length === CHECKS_LIST_NAMES.length;

  if (haveMaxChecksNumber) {
    return {
      common: CHECKS_LIST_NAMES,
      discrepancies: [],
    };
  }

  const fromNames = from.map((el: ScoreElement) => el.name);
  const toNames = to.map((el: ScoreElement) => el.name);
  const allNames = new Set([...fromNames, ...toNames]);
  const common = [];
  const discrepancies = [];

  for (const name of allNames) {
    if (fromNames.includes(name) && toNames.includes(name)) {
      common.push(name);
    } else {
      discrepancies.push(name);
    }
  }

  return {
    common: common.sort(),
    discrepancies: discrepancies.sort(),
  };
};
