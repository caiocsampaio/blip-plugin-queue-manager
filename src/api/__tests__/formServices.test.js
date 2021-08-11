import constants from 'api/constants';
import { validateForm } from 'api/formServices';

 

describe("Form Services", () => {
  let defaultQueueData = constants.defaultQueueData;
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
    expect(result).toStrictEqual({ areWeekdayHoursInvalid: true,areSaturdayHoursInvalid: true,areSundayHoursInvalid: true})
  })
  
})