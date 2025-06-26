import 'bootstrap/dist/css/bootstrap.min.css';


import 'bootstrap/js/dist/collapse';   // for navbar toggler
import 'bootstrap/js/dist/carousel';   // for your scrapbook + project carousels

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//reportWebVitals();
