import { act, getByTestId, getByText, render, screen, waitFor, waitForElement } from '@testing-library/react';
import blipServices from 'api/blipServices';
import iframeServices from 'api/iframeServices';
import { ConfigProvider } from 'contexts/ConfigContext';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AutoMessageComponent } from './AutoMessageComponent';

const defaultResource = {
  wppsaquenaologado: {
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
      saturday: {
        from: ["", ""],
        to: ["", ""],
      },
      sunday: {
        from: ["", ""],
        to: ["", ""],
      },
    },
    autoMessage: "",
  }
};

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
  blipServices.getQueueResource = jest.fn(async () => defaultResource)


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