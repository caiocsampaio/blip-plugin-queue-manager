import { getQueueResource, setQueueResource } from "api/blipServices";
import { showToast, withLoading } from "api/commonServices";
import { getQueue } from "api/iframeServices";
import { BdsButton, BdsInput, BdsPaper, BdsSwitch, BdsTypo } from "blip-ds/dist/blip-ds-react";
import React, { useEffect, useRef, useState } from "react";
import "./workingHours.css";
import { useHistory } from "react-router-dom";
import { showFeedbackInvalidForm, validateForm } from "api/formServices";

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
      from: ["", ""],
      to: ["", ""],
    },
    weekend: {
      from: ["", ""],
      to: ["", ""],
    },
  },
  autoMessage: "",
};

export const WorkingHoursComponent = ({ queueId }) => {
  const history = useHistory();
  const formHours = useRef();
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [queue, setQueue] = useState(null);
  const [resource, setResource] = useState({});
  const [initialState, setInitialState] = useState({});
  const [queueData, setQueueData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isWeekdayDanger, setIsWeekdayDanger] = useState(false);
  const [isWeekendDanger, setIsWeekendDanger] = useState(false);

  const translate = {
    mon: "Seg",
    tue: "Ter",
    wed: "Qua",
    thu: "Qui",
    fri: "Sex",
    sat: "Sab",
    sun: "Dom",
  };

  useEffect(() => {
    withLoading(async () => {
      setQueue(await getQueue(queueId));
    });
  }, [queueId]);

  useEffect(() => {
    withLoading(async () => {
      const resourceResponse = await getQueueResource();
      if (!!resourceResponse) {
        setResource(resourceResponse);
      }
    });
  }, [queue]);

  useEffect(() => {
    if (queue) {
      let data = resource[queue.name];
      if (!data) {
        data = defaultQueueData;
      }
      setQueueData(data);
      setInitialState(data);
    }
  }, [resource]);

  useEffect(() => {
    if (!!queueData) {
      const formValidation = validateForm(queueData);
      setIsWeekdayDanger(formValidation.areWeekdayHoursInvalid);
      setIsWeekendDanger(formValidation.areWeekendHoursInvalid);
      setErrors(formValidation);
    }
  }, [queueData]);

  useEffect(() => {}, [errors]);

  const handleFormSubmit = async (e) => {
    // TODO VERIFICAR SE OS MINUTOS ESTÃO VAZIOS E ADICIONAR COM '00' NO MOMENTO DO ENVIO
    e.preventDefault();
    if (Object.values(errors).find((error) => !!error)) {
      showFeedbackInvalidForm(errors);
      return;
    }
    let newResource = { ...resource };
    newResource[queue.name] = queueData;
    const response = await setQueueResource(newResource);
    const success = response !== null;
    showToast({
      type: success ? "success" : "danger",
      message: success ? "Configurações salvas com sucesso" : "Erro ao salvar configurações",
    });
    history.push("/");
  };

  const handleSwitchChange = (e) => {
    const isActive = e.target.checked;
    let newData = { ...queueData };
    newData.days[e.target.name] = isActive;
    setQueueData(newData);
  };

  const handleWeekdaysHourFrom = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekdays.from[0] = value;
    setQueueData(newQueueData);
  };

  const handleWeekdaysMinFrom = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekdays.from[1] = value;
    setQueueData(newQueueData);
  };

  const handleWeekendHourFrom = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekend.from[0] = value;
    setQueueData(newQueueData);
  };

  const handleWeekendMinFrom = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekend.from[1] = value;
    setQueueData(newQueueData);
  };

  const handleWeekdaysHourTo = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekdays.to[0] = value;
    setQueueData(newQueueData);
  };

  const handleWeekdaysMinTo = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekdays.to[1] = value;
    setQueueData(newQueueData);
  };

  const handleWeekendHourTo = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekend.to[0] = value;
    setQueueData(newQueueData);
  };

  const handleWeekendMinTo = (e) => {
    const value = e.target.value;
    let newQueueData = { ...queueData };
    newQueueData.hours.weekend.to[1] = value;
    setQueueData(newQueueData);
  };

  const handleInputBlur = (e) => {
    let value = e.target.value;
    if (value.length < 2 && parseInt(value) < 10) {
      value = `0${value}`;
    }
    e.target.value = value;
  };

  const handleCancelClick = () => {
    // TODO comparar com o initialState;
    history.push("/");
  };

  return queueData ? (
    <form onSubmit={(e) => handleFormSubmit(e)} ref={formHours}>
      <div className="row">
        <div className="w-100">
          <BdsTypo variant="fs-24">{queue.name}</BdsTypo>
        </div>
        <div className="row">
          <BdsPaper elevation="static" className="m-3 p-4 auto-msg-background">
            <div className="row">
              <div className="col-lg-5 col-sm-4 d-flex justify-content-center align-items-center">
                <div className="flex-column">
                  <div className="d-flex justify-content-center mb-2">
                    <BdsTypo variant="fs-14" bold="bold" className="hydrated">
                      Dias de funcionamento
                    </BdsTypo>
                  </div>
                  <BdsTypo variant="fs-14" bold="bold" className="hydrated">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row">
                        {Object.keys(queueData.days).map((day) => {
                          return day !== "sat" && day !== "sun" ? (
                            <div className="d-flex flex-column m-2" key={day}>
                              <BdsSwitch
                                name={`${day}`}
                                refer={`${day}-switch`}
                                checked={queueData.days[day]}
                                onBdsChange={handleSwitchChange}
                              />
                              <span className="d-flex justify-content-center">
                                {translate[day]}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row justify-content-center">
                        {Object.keys(queueData.days).map((day) => {
                          return day === "sat" || day === "sun" ? (
                            <div className="d-flex flex-column m-2" key={day}>
                              <BdsSwitch
                                name={`${day}`}
                                refer={`${day}-switch`}
                                checked={queueData.days[day]}
                                onBdsChange={handleSwitchChange}
                              />
                              <span className="d-flex justify-content-center">
                                {translate[day]}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </BdsTypo>
                </div>
              </div>
              <div className="col-lg-3 col-sm-4">
                <div className="d-flex justify-content-center mb-3">
                  <BdsTypo variant="fs-14" bold="bold" className="hydrated">
                    Abertura
                  </BdsTypo>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="23"
                      placeholder="hora"
                      value={queueData.hours.weekdays.from[0]}
                      onBdsChange={handleWeekdaysHourFrom}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekdayDanger}
                    />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">
                      &nbsp;:&nbsp;
                    </BdsTypo>
                  </div>
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="59"
                      placeholder="min"
                      value={queueData.hours.weekdays.from[1]}
                      onBdsChange={handleWeekdaysMinFrom}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekdayDanger}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="23"
                      placeholder="hora"
                      value={queueData.hours.weekend.from[0]}
                      onBdsChange={handleWeekendHourFrom}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekendDanger}
                    />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">
                      &nbsp;:&nbsp;
                    </BdsTypo>
                  </div>
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="59"
                      placeholder="min"
                      value={queueData.hours.weekend.from[1]}
                      onBdsChange={handleWeekendMinFrom}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekendDanger}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-4">
                <div className="d-flex justify-content-center mb-3">
                  <BdsTypo variant="fs-14" bold="bold" className="hydrated">
                    Fechamento
                  </BdsTypo>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="23"
                      placeholder="hora"
                      value={queueData.hours.weekdays.to[0]}
                      onBdsChange={handleWeekdaysHourTo}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekdayDanger}
                    />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">
                      &nbsp;:&nbsp;
                    </BdsTypo>
                  </div>
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="59"
                      placeholder="min"
                      value={queueData.hours.weekdays.to[1]}
                      onBdsChange={handleWeekdaysMinTo}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekdayDanger}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="23"
                      placeholder="hora"
                      value={queueData.hours.weekend.to[0]}
                      onBdsChange={handleWeekendHourTo}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekendDanger}
                    />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">
                      &nbsp;:&nbsp;
                    </BdsTypo>
                  </div>
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="59"
                      placeholder="min"
                      value={queueData.hours.weekend.to[1]}
                      onBdsChange={handleWeekendMinTo}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekendDanger}
                    />
                  </div>
                </div>
              </div>
            </div>
          </BdsPaper>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-end">
          <BdsButton variant="secondary" onClick={handleCancelClick}>
            Cancelar
          </BdsButton>
          &nbsp;
          <BdsButton variant="primary" type="submit" disabled={isSaveDisabled}>
            Salvar
          </BdsButton>
        </div>
      </div>
    </form>
  ) : null;
};
