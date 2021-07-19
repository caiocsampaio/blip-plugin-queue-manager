import { WorkingHours } from "components/WorkingHours";
import React from "react";
import { useParams } from "react-router-dom";

export const EditWorkingHoursPage = () => {
  // @ts-ignore
  let { id } = useParams();
  console.log('id :>> ', id);

  return (
    <div>
      <WorkingHours queueId={id} />
    </div>
  );
};
