import { validateForm } from 'api/formServices';
import React from 'react';

const defaultQueueData = {
  days: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },
  hours: {
    weekdays: {
      from: "",
      to: "",
    },
    weekend: {
      from: "",
      to: "",
    },
  },
  autoMessage: "",
};

describe("Form Services", () => {
  it("should be both false", () => {
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: false, areWeekendHoursInvalid: false })
  })
  it("areWeekdayHoursInvalid should be true", () => {
    defaultQueueData.days.mon = true;
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: true, areWeekendHoursInvalid: false })
  })
  it("areWeekendHoursInvalid should also be true", () => {
    defaultQueueData.days.sat = true;
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: true, areWeekendHoursInvalid: true })
  })
})