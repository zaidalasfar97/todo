import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => <App />;

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);