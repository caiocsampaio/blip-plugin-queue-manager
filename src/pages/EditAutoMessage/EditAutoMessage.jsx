import { AutoMessage } from "components/AutoMessage";
import React from "react";
import { useParams } from "react-router-dom";

export const EditAutoMessagePage = () => {
  // @ts-ignore
  let { id } = useParams();

  return (
    <div>
      <AutoMessage queueId={id} />
    </div>
  );
};
