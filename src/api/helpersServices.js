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

const handleSaturdayFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.saturday.from = value;
  setQueueData(newQueueData);
};

const handleSundayFrom = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.sunday.from = value;
  setQueueData(newQueueData);
};

const handleWeekdaysTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.weekdays.to = value;
  setQueueData(newQueueData);
};

const handleSaturdayTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.saturday.to = value;
  setQueueData(newQueueData);
};


const handleSundayTo = (e, queueData, setQueueData) => {
  const value = e.target.value;
  let newQueueData = { ...queueData };
  newQueueData.hours.sunday.to = value;
  setQueueData(newQueueData);
};

const helperServices = {
  sortQueues,
  handleWeekdaysFrom,
  handleSundayFrom,
  handleSaturdayFrom,
  handleWeekdaysTo,
  handleSaturdayTo,
  handleSundayTo
};
export default helperServices;