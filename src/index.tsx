import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { store } from "./redux/store";
import { RESIZE, DATA } from "./constants";
import { JSONData } from "./types";
import { parseData } from "./redux/actions/parseData";

render(
  <Provider store={store}>
    <div className="top">YOLO!</div>
  </Provider>,
  document.getElementById("app"),
  () => {
    fetch("https://klikmodel.lefthandmedia.com/assets/JSON/test.json")
      .then(response => response.json())
      .then(data => {
        store.dispatch(parseData(data as JSONData));
      });
  }
);

window.addEventListener("resize", () => {
  store.dispatch({
    type: RESIZE,
    payload: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });
});
