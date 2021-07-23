const sortQueues = (queues) => {
  return [...queues].sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
}

const handleWeekdaysHourFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.from[0] = value;
  setQueueData(newQueueData);
};

const handleWeekdaysMinFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.from[1] = value;
  setQueueData(newQueueData);
};

const handleWeekendHourFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekend.from[0] = value;
  setQueueData(newQueueData);
};

const handleWeekendMinFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekend.from[1] = value;
  setQueueData(newQueueData);
};

const handleWeekdaysHourTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.to[0] = value;
  setQueueData(newQueueData);
};

const handleWeekdaysMinTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.to[1] = value;
  setQueueData(newQueueData);
};

const handleWeekendHourTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekend.to[0] = value;
  setQueueData(newQueueData);
};

const handleWeekendMinTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekend.to[1] = value;
  setQueueData(newQueueData);
};

const helperServices = {
  sortQueues,
  handleWeekdaysHourFrom,
  handleWeekdaysMinFrom,
  handleWeekendHourFrom,
  handleWeekendMinFrom,
  handleWeekdaysHourTo,
  handleWeekdaysMinTo,
  handleWeekendHourTo,
  handleWeekendMinTo
};
export default helperServices;