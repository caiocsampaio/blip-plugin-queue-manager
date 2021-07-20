import { WorkingHours } from "components/WorkingHours";
import React from "react";
import { useParams } from "react-router-dom";

export const EditWorkingHoursPage = () => {
  // @ts-ignore
  let { id } = useParams();

  return (
    <div>
      <WorkingHours queueId={id} />
    </div>
  );
};
