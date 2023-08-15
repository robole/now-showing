import {truncate, formatDate} from "../../../src/scripts/format";

describe("format", () => {
  test("should truncate a number to 1 decimal place by default", () => {
    let result = truncate(8.043);

    expect(result).toEqual(8.0);
  });

	test("should truncate a number to a supplied number of decimal places", () => {
    let result = truncate(8.055, 2);

    expect(result).toEqual(8.05);
  });

	test("should format a data to 'yyyy-mm-dd'", () => {
    let date = Date.parse("Feb 1, 2023");

    expect(formatDate(date)).toEqual("2023-02-01");
  });

});
