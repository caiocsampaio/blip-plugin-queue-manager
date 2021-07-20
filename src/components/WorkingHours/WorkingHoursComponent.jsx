import { getQueueResource, setQueueResource } from "api/blipServices";
import { showToast, withLoading } from "api/commonServices";
import { getQueue } from "api/iframeServices";
import {
  BdsButton,
  BdsInput,
  BdsInputEditable,
  BdsPaper,
  BdsSwitch,
  BdsTypo,
} from "blip-ds/dist/blip-ds-react";
import React, { useEffect, useRef, useState } from "react";
import "./workingHours.css";
import { useHistory } from "react-router-dom";

export const WorkingHoursComponent = ({ queueId }) => {
  const history = useHistory();
  const formHours = useRef();
  const inputsRef = useRef({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [queue, setQueue] = useState({ name: "" });
  const [resource, setResource] = useState({});
  const [initialState, setInitialState] = useState({});
  const [queueData, setQueueData] = useState(null);

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
      const resourceResponse = await getQueueResource();
      if (!!resourceResponse) {
        setResource(resourceResponse);
      }
    });
  }, [queueId]);

  useEffect(() => {
    const data = resource[queue.name];
    if (data) {
      setQueueData(data);
      setInitialState(data);
    }
  }, [resource, queue]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newResource = resource;
    newResource[queue.name] = queueData;
    const response = await setQueueResource(newResource);
    const success = response !== null;
    showToast({
      type: success ? "success" : "danger",
      message: success ? "Configurações salvas com sucesso" : "Erro ao salvar configurações",
    });
    history.push('/');
  };

  const handleSwitchChange = (e) => {
    const isActive = e.target.checked;
    let newData = queueData;
    newData.days[e.target.name] = isActive;
    setQueueData(newData);
  };

  const handleHoursChange = () => {
    if (Object.keys(inputsRef.current).length > 0) {
      let newQueueData = queueData;
      newQueueData.hours = {
        weekdays: {
          from: [
            inputsRef.current["weekdayFromHour"].value,
            inputsRef.current["weekdayFromMin"].value,
          ],
          to: [inputsRef.current["weekdayToHour"].value, inputsRef.current["weekdayToMin"].value],
        },
        weekends: {
          from: [
            inputsRef.current["weekendFromHour"].value,
            inputsRef.current["weekendFromMin"].value,
          ],
          to: [inputsRef.current["weekendToHour"].value, inputsRef.current["weekendToMin"].value],
        },
      };
      setQueueData(newQueueData);
    }
  };

  const handleInputBlur = (e) => {
    console.log('e :>> ', e);
    let value = e.target.value;
    console.log('value :>> ', value);
    if (value.length < 2 && parseInt(value) < 10) {
      value = `0${value}`;
    }
    console.log('value :>> ', value);
    e.target.value = value;
    console.log('e :>> ', e);
  }

  const handleCancelClick = () => {
    // TODO comparar com o initialState;
    history.goBack();
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
                      required
                      placeholder="hora"
                      value={queueData.hours.weekdays.from[0]}
                      ref={(input) => (inputsRef.current["weekdayFromHour"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
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
                      required
                      placeholder="min"
                      value={queueData.hours.weekdays.from[1]}
                      ref={(input) => (inputsRef.current["weekdayFromMin"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="23"
                      required
                      placeholder="hora"
                      value={queueData.hours.weekends.from[0]}
                      ref={(input) => (inputsRef.current["weekendFromHour"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
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
                      required
                      placeholder="min"
                      value={queueData.hours.weekends.from[1]}
                      ref={(input) => (inputsRef.current["weekendFromMin"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
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
                      required
                      placeholder="hora"
                      value={queueData.hours.weekdays.to[0]}
                      ref={(input) => (inputsRef.current["weekdayToHour"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
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
                      required
                      placeholder="min"
                      value={queueData.hours.weekdays.to[1]}
                      ref={(input) => (inputsRef.current["weekdayToMin"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput
                      type="number"
                      min="0"
                      max="23"
                      required
                      placeholder="hora"
                      value={queueData.hours.weekends.to[0]}
                      ref={(input) => (inputsRef.current["weekendToHour"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
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
                      required
                      placeholder="min"
                      value={queueData.hours.weekends.to[1]}
                      ref={(input) => (inputsRef.current["weekendToMin"] = input)}
                      onBdsChange={handleHoursChange}
                      onBdsOnBlur={handleInputBlur}
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
