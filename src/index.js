import React from 'react';
import ReactDOM from 'react-dom';


import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './components/auth/context.js';

const Main = () => <App />;

const rootElement = document.getElementById('root');
ReactDOM.render(
    <LoginProvider>
        <Main />
    </LoginProvider>,
    rootElement,
);