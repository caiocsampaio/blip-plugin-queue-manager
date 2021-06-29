import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import App from './App';
import { applyPolyfills, defineCustomElements } from 'blip-ds/loader';
import { setHeight } from 'api/commonServices';
import { IframeMessageProxy } from 'iframe-message-proxy';

IframeMessageProxy.listen();

const rootDiv = document.getElementById("root");

const documentObserver = new ResizeObserver(() => {
  setHeight(rootDiv.scrollHeight);
});

documentObserver.observe(rootDiv);

ReactDOM.render(<App />, document.getElementById("root"));

applyPolyfills().then(() => {
  defineCustomElements(window);
});