import commonServices from "./commonServices";

export const validateForm = (queueData) => {
  let areWeekdayHoursInvalid = false;
  let areSaturdayHoursInvalid = false;
  let areSundayHoursInvalid = false;
  let anyWeekdayIsChecked = Object.keys(queueData.days).find(key => ['mon', 'tue', 'wed', 'thu', 'fri'].includes(key) && queueData.days[key] === true);
  let anySaturdayIsChecked = Object.keys(queueData.days).find(key => ['sat'].includes(key) && queueData.days[key] === true);
  let anySundayIsChecked = Object.keys(queueData.days).find(key => ['sun'].includes(key) && queueData.days[key] === true);
  if (anyWeekdayIsChecked) {
    areWeekdayHoursInvalid = queueData.hours.weekdays.from === ''
      || queueData.hours.weekdays.to === '';
  }

  if (anySaturdayIsChecked) {
    areSaturdayHoursInvalid = queueData.hours.saturday.from === ''
      || queueData.hours.saturday.to === '';
  }

  if (anySundayIsChecked) {
    areSundayHoursInvalid = queueData.hours.sunday.from === ''
      || queueData.hours.sunday.to === '';
  }

  return { areWeekdayHoursInvalid, areSaturdayHoursInvalid, areSundayHoursInvalid };
}

export const showFeedbackInvalidWorkingHoursForm = (errors) => {
  if (errors.areWeekdayHoursInvalid || errors.areSaturdayHoursInvalid || errors.areSundayHoursInvalid) {
    commonServices.showToast({
      type: "danger",
      title: "Horários inválidos",
      message: "Verifique se os horários estão corretos e tente novamente",
    })
  }
}

export const showFeedbackInvalidAutoMessageForm = () => {
  commonServices.showToast({
    type: "danger",
    message: "Por favor personalize a sua mensagem com pelo menos o dia e o horário do atendimento. Esta mensagem será exibida para o usuário quando ele tentar entrar em contato.",
  })
}