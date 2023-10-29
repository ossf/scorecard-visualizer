import { areEqualElements } from "./areEqualElements.tsx";

const baseScoreElement = {
  name: "foo",
  score: 0,
  reason: "sample reason",
  details: ["sample detail"],
  documentation: {
    short: "documentation short",
    url: "documentation url",
  },
};

describe("util: areEqualElements", () => {
  it("returns true if two elements are equal", () => {
    expect(
      areEqualElements(
        { ...baseScoreElement, details: ["foo"], reason: "foo" },
        { ...baseScoreElement, details: ["foo"], reason: "foo" },
      ),
    ).toBe(true);
  });

  it("returns false if two elements are not equal", () => {
    expect(
      areEqualElements(
        { ...baseScoreElement, details: ["foo"], reason: "foo" },
        { ...baseScoreElement, details: ["bar"], reason: "bar" },
      ),
    ).toBe(false);
    expect(
      areEqualElements(
        { ...baseScoreElement, details: ["foo"], reason: "foo" },
        { ...baseScoreElement, details: ["bar"], reason: "foo" },
      ),
    ).toBe(false);
    expect(
      areEqualElements(
        { ...baseScoreElement, details: ["foo"], reason: "foo" },
        { ...baseScoreElement, details: ["foo"], reason: "bar" },
      ),
    ).toBe(false);
  });
});
