import { AutoMessage } from 'components/AutoMessage';
import { WorkingHours } from 'components/WorkingHours';
import React from 'react'
import { useParams } from 'react-router-dom';

export const EditQueuePage = () => {
  // @ts-ignore
  let { id } = useParams()
  return (
    <div>
      <WorkingHours queueId={id} />
      <AutoMessage queueId={id} />
    </div>
  )
}
