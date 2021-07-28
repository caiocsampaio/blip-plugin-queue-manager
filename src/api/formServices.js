import { showToast } from "./commonServices";

export const validateForm = (queueData) => {
  let areWeekdayHoursInvalid = false;
  let areWeekendHoursInvalid = false;
  let anyWeekdayIsChecked = Object.keys(queueData.days).find(key => ['mon', 'tue', 'wed', 'thu', 'fri'].includes(key) && queueData.days[key] === true);
  let anyWeekendIsChecked = Object.keys(queueData.days).find(key => ['sat', 'sun'].includes(key) && queueData.days[key] === true);
  if (anyWeekdayIsChecked) {
    areWeekdayHoursInvalid = queueData.hours.weekdays.from === ''
      || queueData.hours.weekdays.to === '';
  }

  if (anyWeekendIsChecked) {
    areWeekendHoursInvalid = queueData.hours.weekend.from === ''
      || queueData.hours.weekend.to === '';
  }

  return { areWeekdayHoursInvalid, areWeekendHoursInvalid };
}

export const showFeedbackInvalidWorkingHoursForm = (errors) => {
  if (errors.areWeekdayHoursInvalid || errors.areWeekendHoursInvalid) {
    showToast({
      type: "danger",
      title: "Horários inválidos",
      message: "Verifique se os horários estão corretos e tente novamente",
    })
  }
}

export const showFeedbackInvalidAutoMessageForm = () => {
  showToast({
    type: "danger",
    message: "Por favor personalize a sua mensagem com pelo menos o dia e o horário do atendimento. Esta mensagem será exibida para o usuário quando ele tentar entrar em contato.",
  })
}