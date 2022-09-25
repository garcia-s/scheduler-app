import { Timeframe } from "../../../../../modules/scheduling/_domain/value_objects/timeframe";

describe("Tests for timeframe value object", () => {
  test("Should fail if start date is invalid", () => {
    const timeframe = Timeframe.create({
      startDate: "not valid",
      duration: 20,
    });
    expect(timeframe.err).toBeTruthy();
  });

  test("Should not fail if the startdate is a ISO8061 valid string", () => {
    const timeframe = Timeframe.create({
      startDate: "2022-09-25T19:17:23.629Z",
      duration: 20,
    });
    expect(timeframe.err).toBeFalsy();
  });

  test("duration should be equal to the duration provided", () => {
    const timeframe = Timeframe.create({
      startDate: "2022-09-25T19:17:23.629Z",
      duration: 20,
    });
    expect((timeframe.val as Timeframe).duration).toBe(20);
  });
});
