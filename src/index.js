import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { ImageUrlsContextProvider } from './context/imageUrlsContext';
import { CounterContextProvider } from './context/countersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ImageUrlsContextProvider>
        <CounterContextProvider>
          <App />
        </CounterContextProvider>
      </ImageUrlsContextProvider>
    </HashRouter>
  </React.StrictMode>
);