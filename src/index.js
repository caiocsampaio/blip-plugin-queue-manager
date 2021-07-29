import { setHeight } from 'api/commonServices';
import { applyPolyfills, defineCustomElements } from 'blip-ds/loader';
import { IframeMessageProxy } from 'iframe-message-proxy';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

console.log(
  `Developed by Caio Sampaio.

Feel free to email me with any sugestions or (possible) bugs you find: caiosp@take.net`
)

IframeMessageProxy.listen();

const rootDiv = document.getElementById("root");

const documentObserver = new ResizeObserver(() => {
  setHeight(rootDiv.scrollHeight + 200);
});

documentObserver.observe(rootDiv);

ReactDOM.render(
  <App />
  , document.getElementById("root")
);

applyPolyfills().then(() => {
  defineCustomElements(window);
});