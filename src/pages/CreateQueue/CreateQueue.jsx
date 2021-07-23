import { WorkingHours } from 'components/WorkingHours'
import React, { useEffect } from 'react'

export const CreateQueuePage = () => {
  useEffect(() => {
    console.log("create queue page")
  })
  return (
    <div>
      <WorkingHours queueId={null} />
    </div>
  )
}
