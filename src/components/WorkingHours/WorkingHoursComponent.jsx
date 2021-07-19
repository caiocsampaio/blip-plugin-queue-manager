import { withLoading } from 'api/commonServices';
import { getQueue } from 'api/iframeServices';
import { BdsButton, BdsInput, BdsInputEditable, BdsPaper, BdsSwitch, BdsTypo } from 'blip-ds/dist/blip-ds-react';
import React, { useEffect, useState } from 'react'
import './workingHours.css'

export const WorkingHoursComponent = ({ queueId }) => {
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [queue, setQueue] = useState({ name: "" })
  const [weekdayHours, setWeekdayHours] = useState({opening: "", closing: ""});
  const [weekendHours, setWeekendHours] = useState({});

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
  const weekendDays = ['Sab', 'Dom'];

  useEffect(() => {
    withLoading(async () => {
      setQueue(await getQueue(queueId));
    })
  }, [queueId])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("working hours submit");
  }
  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div className="row">
        <div className="w-100">
          <BdsInputEditable size="standard" inputName="queue-name" expand={true} value={queue.name} />
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
                        {weekDays.map(day => {
                          return (
                            <div className="d-flex flex-column m-2">
                              <BdsSwitch name={`${day}-switch`} refer={`${day}-switch`}
                                checked={false} onBdsChange={() => null} />
                              <span className="d-flex justify-content-center">{day}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row justify-content-center">
                        {weekendDays.map(day => {
                          return (
                            <div className="d-flex flex-column m-2">
                              <BdsSwitch name={`${day}-switch`} refer={`${day}-switch`}
                                checked={false} onBdsChange={() => null} />
                              <span className="d-flex justify-content-center">{day}</span>
                            </div>
                          )
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
                    <BdsInput type="number" min="0" max="23" required placeholder="hora" value={weekdayHours.opening}/>
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">&nbsp;:&nbsp;</BdsTypo>
                  </div>
                  <div>
                    <BdsInput type="number" min="0" max="59" required placeholder="min" value={weekdayHours.closing} />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput type="number" min="0" max="23" required placeholder="hora" />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">&nbsp;:&nbsp;</BdsTypo>
                  </div>
                  <div>
                    <BdsInput type="number" min="0" max="59" required placeholder="min" />
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
                    <BdsInput type="number" min="0" max="23" required placeholder="hora" />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">&nbsp;:&nbsp;</BdsTypo>
                  </div>
                  <div>
                    <BdsInput type="number" min="0" max="59" required placeholder="min" />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center mt-1">
                  <div>
                    <BdsInput type="number" min="0" max="23" required placeholder="hora" />
                  </div>
                  <div className="mt-2">
                    <BdsTypo variant="fs-20" bold="regular" className="hydrated">&nbsp;:&nbsp;</BdsTypo>
                  </div>
                  <div>
                    <BdsInput type="number" min="0" max="59" required placeholder="min" />
                  </div>
                </div>
              </div>
            </div>
          </BdsPaper>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-end">
          <BdsButton variant="secondary">Cancelar</BdsButton>
          &nbsp;
          <BdsButton variant="primary" type="submit" disabled={isSaveDisabled}>Salvar</BdsButton>
        </div>
      </div>
    </form>
  )
}
