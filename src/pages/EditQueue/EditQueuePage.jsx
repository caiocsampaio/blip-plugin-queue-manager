import { BdsButton, BdsIcon, BdsInput, BdsPaper, BdsTooltip, BdsTypo } from 'blip-ds/dist/blip-ds-react';
import { AutoMessage } from 'components/AutoMessage';
import { WorkingHours } from 'components/WorkingHours';
import { CommonContext } from 'contexts/CommonContext';
import { ConfigContext } from 'contexts/ConfigContext';
import React, { useContext, useState } from 'react'

export const EditQueuePage = () => {
  return (
    <div>
      {/* <AutoMessage /> */}
      <WorkingHours queueId="wppsaquenaologado" />
    </div>
  )
}
