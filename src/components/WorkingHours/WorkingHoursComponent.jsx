//#region IMPORTS
import blipServices from "api/blipServices";
import { showToast, withoutLoading } from "api/commonServices";
import { showFeedbackInvalidWorkingHoursForm, validateForm } from "api/formServices";
import helperServices from "api/helpersServices";
import { BdsButton, BdsInput, BdsPaper, BdsSwitch, BdsTypo } from "blip-ds/dist/blip-ds-react";
import { ChangesModal } from "components/ChangesModal";
import QueueTitle from "components/QueueTitle/QueueTitle";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import "./workingHours.css";
//#endregion

export const WorkingHoursComponent = ({
  queueId,
  queue,
  resource,
  queueData,
  initialState,
  setQueueData,
  setQueue,
}) => {
  //#region USE STATE CALLS
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
  const history = useHistory();
  const formHours = useRef();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [isWeekdayDanger, setIsWeekdayDanger] = useState(false);
  const [isWeekendDanger, setIsWeekendDanger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [title, setTitle] = useState(queue.name);
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
    if (!!queueData) {
      const formValidation = validateForm(queueData);
      setIsWeekdayDanger(formValidation.areWeekdayHoursInvalid);
      setIsWeekendDanger(formValidation.areWeekendHoursInvalid);
      setErrors(formValidation);
      setIsSaveDisabled(
        formValidation.areWeekdayHoursInvalid ||
          formValidation.areWeekendHoursInvalid ||
          _.isEqual(queueData, initialState) ||
          title === "Nova Fila"
      );
    }
  }, [queueData, initialState]);

  useEffect(() => {
    withoutLoading(async () => {
      if (title !== queue.name) {
        let newQueue = { ...queue };
        newQueue.name = title;
        const response = await blipServices.setQueue(newQueue);
        const success = response !== null;
        showToast({
          title: success ? null : "Algo deu errado...",
          type: success ? "success" : "danger",
          message: success
            ? "Fila salva com sucesso!"
            : "Houve um erro ao salvar a fila, tente novamente.",
        });
      }
    });
  }, [title]);

  useEffect(() => {
    if (goBack) {
      history.goBack();
    }
  }, [goBack, history]);
  //#endregion

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).find((error) => !!error)) {
      showFeedbackInvalidWorkingHoursForm(errors);
      return;
    }
    let newResource = { ...resource };
    newResource[queue.id] = queueData;
    const response = await blipServices.setQueueResource(newResource);
    const success = response !== null;
    showToast({
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

  const handleHoursChanges = (handleInputFunction, e) => {
    handleInputFunction(e, queueData, setQueueData);
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
    const hasFormChanged = !_.isEqual(queueData, initialState);
    if (hasFormChanged) {
      setIsModalOpen(true);
      return false;
    }
  };

  const handleModalBtnClick = (isConfirmed) => {
    setIsModalOpen(false);
    if (isConfirmed) {
      setShouldBlockNavigation(false);
      setGoBack(true);
    }
  };
  //#endregion

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} ref={formHours}>
      <Prompt when={shouldBlockNavigation} message={handleBlockNavigation} />
      <div className="row">
        <div className="w-100">
          <QueueTitle title={title} setTitle={setTitle} />
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
                      // @ts-ignore
                      type="time"
                      value={queueData.hours.weekdays.from}
                      onBdsChange={(e) => handleHoursChanges(helperServices.handleWeekdaysFrom, e)}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekdayDanger}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput
                      // @ts-ignore
                      type="time"
                      value={queueData.hours.weekend.from}
                      onBdsChange={(e) => handleHoursChanges(helperServices.handleWeekendFrom, e)}
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
                      // @ts-ignore
                      type="time"
                      value={queueData.hours.weekdays.to}
                      onBdsChange={(e) => handleHoursChanges(helperServices.handleWeekdaysTo, e)}
                      onBdsOnBlur={handleInputBlur}
                      danger={isWeekdayDanger}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput
                      // @ts-ignore
                      type="time"
                      value={queueData.hours.weekend.to}
                      onBdsChange={(e) => handleHoursChanges(helperServices.handleWeekendTo, e)}
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
      <ChangesModal open={isModalOpen} handleClick={handleModalBtnClick} />
    </form>
  );
};
