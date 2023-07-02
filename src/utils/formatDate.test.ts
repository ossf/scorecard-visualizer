import { formatDate } from "./formatDate";

describe("Format date", () => {
  it("should return the date formatted as expected", () => {
    const dateToFormat = "2023-07-02T10:27:18.412Z";
    expect(formatDate(dateToFormat)).toBe("July 2, 2023");
  });
});
