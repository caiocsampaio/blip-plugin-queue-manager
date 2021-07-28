const sortQueues = (queues) => {
  return [...queues].sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
}

const handleWeekdaysFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.from = value;
  setQueueData(newQueueData);
};

const handleWeekendFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekend.from = value;
  setQueueData(newQueueData);
};

const handleWeekdaysTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.to = value;
  setQueueData(newQueueData);
};

const handleWeekendTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekend.to = value;
  setQueueData(newQueueData);
};

const helperServices = {
  sortQueues,
  handleWeekdaysFrom,
  handleWeekendFrom,
  handleWeekdaysTo,
  handleWeekendTo,
};
export default helperServices;