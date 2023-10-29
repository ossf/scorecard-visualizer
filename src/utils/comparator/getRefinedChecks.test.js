import { getRefinedChecks } from "./getRefinedChecks.tsx";
import { CHECKS_LIST_NAMES } from "../../constants/checks.ts";
import sample1 from "../../../cypress/fixtures/2ac5e9889aba461f5a54d320973d2574980d206b.json";
import sample2 from "../../../cypress/fixtures/077fd7d83d7d41695137c1af5b9be1d72250e69e.json";

describe("util: getRefinedChecks", () => {
  it("Should handle empty checks", () => {
    expect(getRefinedChecks([], [])).toEqual({
      common: [],
      discrepancies: [],
    });
  });

  it("Should handle an empty check", () => {
    expect(getRefinedChecks(sample1.checks, [])).toEqual({
      common: [],
      discrepancies: CHECKS_LIST_NAMES,
    });

    expect(getRefinedChecks([], sample1.checks)).toEqual({
      common: [],
      discrepancies: CHECKS_LIST_NAMES,
    });
  });

  it("Should generate a refined valid result", () => {
    expect(getRefinedChecks(sample1.checks, sample2.checks)).toEqual({
      common: CHECKS_LIST_NAMES,
      discrepancies: [],
    });
  });

  it("Should handle discrepancies and provide a valid result", () => {
    const filteredList = sample1.checks.filter(
      (item) => item.name !== "Binary-Artifacts",
    );
    expect(getRefinedChecks(filteredList, sample2.checks)).toEqual({
      common: filteredList.map((item) => item.name),
      discrepancies: ["Binary-Artifacts"],
    });
  });
});
