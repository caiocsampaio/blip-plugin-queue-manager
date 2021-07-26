import { getQueueResource } from "api/blipServices";
import { withoutLoading } from "api/commonServices";
import { WorkingHours } from "components/WorkingHours";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import iframeService from "api/iframeServices";

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

export const EditWorkingHoursPage = () => {
  // @ts-ignore
  let { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [resource, setResource] = useState({});
  const [initialState, setInitialState] = useState(null);
  const [queueData, setQueueData] = useState(null);

  useEffect(() => {
    withoutLoading(async () => {
      if (id) {
        setQueue(await iframeService.getQueue(id));
      }
    });
  }, [id]);

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
      let data = resource[queue.id];
      if (!data) {
        data = defaultQueueData;
      }
      setQueueData(_.cloneDeep(data));
      setInitialState(_.cloneDeep(data));
    }
  }, [resource, queue]);

  return (
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
  );
};
