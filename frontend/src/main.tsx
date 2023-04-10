import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import {store} from "./store";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(app)
