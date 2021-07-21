//#region IMPORTS
import { getQueueResource, setQueueResource } from "api/blipServices";
import { showToast, withoutLoading } from "api/commonServices";
import { showFeedbackInvalidForm, validateForm } from "api/formServices";
import { getQueue } from "api/iframeServices";
import {
  BdsAlert,
  BdsAlertActions,
  BdsAlertBody,
  BdsAlertHeader,
  BdsButton,
  BdsInput,
  BdsPaper,
  BdsSwitch,
  BdsTypo,
} from "blip-ds/dist/blip-ds-react";
import React, { useEffect, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import "./workingHours.css";
//#endregion

//#region DEFAULT DATA
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
//#endregion

export const WorkingHoursComponent = ({ queueId }) => {
  //#region USE STATE CALLS
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goBack, setGoBack] = useState(false);
  //#endregion

  const translate = {
    mon: "Seg",
    tue: "Ter",
    wed: "Qua",
    thu: "Qui",
    fri: "Sex",
    sat: "Sab",
    sun: "Dom",
  };

  //#region USE EFFECT CALLS
  useEffect(() => {
    withoutLoading(async () => {
      setQueue(await getQueue(queueId));
    });
  }, [queueId]);

  useEffect(() => {
    withoutLoading(async () => {
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

  useEffect(() => {
    if (goBack) {
      history.goBack();
    }
  }, [goBack]);
  //#endregion

  const handleFormSubmit = async (e) => {
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
      position: "bottom-right",
      title: success ? null : "Algo deu errado...",
      type: success ? "success" : "danger",
      message: success
        ? "Fila salva com sucesso!"
        : "Houve um erro ao salvar a fila, tente novamente.",
    });
    if (success) {
      setShouldBlockNavigation(false);
      history.push("/");
    }
  };

  //#region HANDLE INPUTS CHANGES 

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
  //#endregion

  //#region HANDLE NAVIGATION
  const handleCancelClick = () => {
    history.goBack();
  };

  const handleBlockNavigation = () => {
    const hasFormChanged = queueData != initialState;
    if (hasFormChanged) {
      setIsModalOpen(true);
      return false;
    }
  };

  const handleModalBtnClick = (isConfirmed) => {
    console.log("isConfirmed :>> ", isConfirmed);
    setIsModalOpen(false);
    if (isConfirmed) {
      setShouldBlockNavigation(false);
      setGoBack(true);
    }
  };
  //#endregion

  return queueData ? (
    <form onSubmit={(e) => handleFormSubmit(e)} ref={formHours}>
      <Prompt when={shouldBlockNavigation} message={handleBlockNavigation} />
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
        <BdsAlert open={isModalOpen}>
          <BdsAlertHeader icon="warning" variant="warning">
            {"Você possui alterações não salvas"}
          </BdsAlertHeader>
          <BdsAlertBody>
            {
              "Tem certeza de que deseja descartar suas alterações? Essa ação não poderá ser desfeita."
            }
          </BdsAlertBody>
          <BdsAlertActions>
            <BdsButton onClick={() => handleModalBtnClick(true)} variant="secondary">
              {"Sim, descartar"}
            </BdsButton>
            <BdsButton onClick={() => handleModalBtnClick(false)} variant="secondary">
              {"Não, cancelar"}
            </BdsButton>
          </BdsAlertActions>
        </BdsAlert>
      </div>
    </form>
  ) : null;
};
