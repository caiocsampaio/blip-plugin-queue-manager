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
    saturday: {
      from: "",
      to: "",
    },
  },
  autoMessage: "",
};

describe("Form Services", () => {
  it("should be all false", () => {
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: false, areSaturdayHoursInvalid: false,areSundayHoursInvalid: false})
  })
  it("areWeekdayHoursInvalid should be true", () => {
    defaultQueueData.days.mon = true;
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: true, areSaturdayHoursInvalid: false,areSundayHoursInvalid: false})
  })
  it("areSaturdayHoursInvalid should also be true", () => {
    defaultQueueData.days.sat = true;
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: true,areSaturdayHoursInvalid: true,areSundayHoursInvalid: false})
  })
  it("areSundayHoursInvalid should also be true", () => {
    defaultQueueData.days.sun = true;
    const result = validateForm(defaultQueueData)
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: true,areSaturdayHoursInvalid: false,areSundayHoursInvalid: true})
  })
  
})