import blipServices from "api/blipServices";
import commonServices from "api/commonServices";
import iframeService from "api/iframeServices";
import { WorkingHours } from "components/WorkingHours";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      from: "",
      to: "",
    },
    saturday: {
      from: "",
      to: "",
    },
    sunday: {
      from: "",
      to: "",
    },
  },
  autoMessage: "",
};
//#endregion

export const EditWorkingHoursPage = () => {
  // @ts-ignore
  let { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [resource, setResource] = useState({});
  const [initialState, setInitialState] = useState(null);
  const [queueData, setQueueData] = useState(null);

  useEffect(() => {
    commonServices.withoutLoading(async () => {
      if (id) {
        setQueue(await iframeService.getQueue(id));
      }
    });
  }, [id]);

  useEffect(() => {
    commonServices.withoutLoading(async () => {
      const resourceResponse = await blipServices.getQueueResource();
      if (!!resourceResponse) {
        setResource(resourceResponse);
      }
    });
  }, [queue]);

  useEffect(() => {
    if (queue) {
      let data = resource[queue.id];
      if (!data) {
        data = defaultQueueData;
      }
      setQueueData(_.cloneDeep(data));
      setInitialState(_.cloneDeep(data));
    }
  }, [resource, queue]);

  return queueData ? (
    <div>
      <WorkingHours
        queueId={id}
        queue={queue}
        resource={resource}
        queueData={queueData}
        initialState={initialState}
        setQueue={setQueue}
        setQueueData={setQueueData}
      />
    </div>
  ) : null;
};
