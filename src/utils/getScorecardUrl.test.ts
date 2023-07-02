import { getScorecardUrl } from "./getScorecardUrl";

describe("Get Scorecard Url", () => {
  const params = {
    platform: "github.com",
    org: "nodejs",
    repo: "node",
    commitHash: undefined,
  };
  it("Should return the scorecard url", () => {
    expect(getScorecardUrl(params)).toBe(
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node"
    );
  });
  it("Should return the scorecard url with commit hash", () => {
    expect(
      getScorecardUrl({
        ...params,
        commitHash: "1cea384480a6dea80128e5e0ddb714df7bea1520",
      })
    ).toBe(
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=1cea384480a6dea80128e5e0ddb714df7bea1520"
    );
  });
});
