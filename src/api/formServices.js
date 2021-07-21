import { showToast } from "./commonServices";

export const validateForm = (queueData, inputs) => {
  let areWeekdayHoursInvalid = false;
  let areWeekendHoursInvalid = false;
  let anyWeekdayIsChecked = Object.keys(queueData.days).find(key => ['mon', 'tue', 'wed', 'thu', 'fri'].includes(key) && queueData.days[key] === true);
  let anyWeekendIsChecked = Object.keys(queueData.days).find(key => ['sat', 'sun'].includes(key) && queueData.days[key] === true);

  if (anyWeekdayIsChecked) {
    areWeekdayHoursInvalid = queueData.hours.weekdays.from.includes('')
      || queueData.hours.weekdays.to.includes('');
  }

  if (anyWeekendIsChecked) {
    areWeekendHoursInvalid = queueData.hours.weekend.from.includes('')
      || queueData.hours.weekend.to.includes('');
  }

  return { areWeekdayHoursInvalid, areWeekendHoursInvalid };
}

export const showFeedbackInvalidForm = (errors) => {
  if (errors.areWeekdayHoursInvalid || errors.areWeekendHoursInvalid) {
    showToast({
      type: "danger",
      title: "Horários inválidos",
      message: "Verifique se os horários estão corretos e tente novamente",
    })
  }
}