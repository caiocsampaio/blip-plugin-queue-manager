import { act, getByTestId, getByText, render, screen, waitFor, waitForElement } from '@testing-library/react';
import blipServices from 'api/blipServices';
import constants from 'api/constants';
import iframeServices from 'api/iframeServices';
import { ConfigProvider } from 'contexts/ConfigContext';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AutoMessageComponent } from './AutoMessageComponent';


const defaultQueue = {
  id: "wppsaquenaologado",
  ownerIdentity: "bmgtransbordo2prod@msging.net",
  name: "WppSaqueNaoLogado",
  isActive: true,
  storageDate: "2021-05-31T14:30:25.270Z",
  Priority: 0,
};

describe("AutoMessageComponent", () => {
  jest.mock('api/iframeServices', () => jest.fn());
  iframeServices.getQueue = jest.fn(async () => defaultQueue)

  jest.mock('api/blipServices', () => jest.fn());
  blipServices.getQueueResource = jest.fn(async () => constants.defaultResource)


  it("should render", async () => {
    act(() => {
      render(
        <BrowserRouter>
          <ConfigProvider>
            <AutoMessageComponent queueId={"wppsaquenaologado"} />
          </ConfigProvider>
        </BrowserRouter>
      )
    })
    const node = await waitFor(() => screen.getByTestId("queueTitle"));
    expect(node).toBeInTheDocument();
  })
})