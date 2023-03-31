import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ErrorBoundary} from "react-error-boundary";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./modules/Auth/AppRouter";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <BrowserRouter>

            <AppRouter/>
        </BrowserRouter>
    </ErrorBoundary>
);


