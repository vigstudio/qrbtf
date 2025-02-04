import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import {createStore} from "redux";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
