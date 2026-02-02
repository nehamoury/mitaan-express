import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

import { BrowserRouter } from 'react-router-dom';

import GlobalErrorBoundary from './components/GlobalErrorBoundary';

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <GlobalErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalErrorBoundary>
    </React.StrictMode>
);
