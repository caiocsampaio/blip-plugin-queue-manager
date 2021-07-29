import { act, render, screen, waitFor } from '@testing-library/react';
import blipServices from 'api/blipServices';
import commonServices from 'api/commonServices';
import iframeServices from 'api/iframeServices';
import { HomePage } from 'pages/Home/HomePage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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
      weekend: {
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

const defaultQueueList = [
  {
    id: "wppsaquenaologado",
    ownerIdentity: "bmgtransbordo2prod@msging.net",
    name: "WppSaqueNaoLogado",
    isActive: true,
    storageDate: "2021-05-31T14:30:25.270Z",
    Priority: 0,
  },
  {
    id: "wppsaquenaologado2",
    ownerIdentity: "bmgtransbordo2prod@msging.net",
    name: "WppSaqueNaoLogado2",
    isActive: true,
    storageDate: "2021-05-31T14:30:25.270Z",
    Priority: 0,
  }
];

describe("HomePage", () => {
  jest.mock('api/iframeServices', () => jest.fn());
  iframeServices.getQueue = jest.fn(async () => defaultQueue)
  iframeServices.getQueues = jest.fn(async () => defaultQueueList)

  jest.mock('api/blipServices', () => jest.fn());
  blipServices.getQueueResource = jest.fn(async () => defaultResource)

  jest.mock('api/commonServices', () => jest.fn());
  commonServices.getOrCreateConfigResource = jest.fn(async () => defaultQueueList)


  it("should render", async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    act(() => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      )
    })

    const node = await waitFor(() => screen.getByTestId("wppsaquenaologado"));
    expect(node).toBeInTheDocument();
  })
})
