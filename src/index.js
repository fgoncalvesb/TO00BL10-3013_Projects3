// For CORS handling
//var express = require('express');
//var cors = require('cors');
//var app = express();
//app.use(cors());

//import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOMClient from 'react-dom/client';
//import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.css';
//import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

//var counter = 1

//const refresh = () => {
//ReactDOM.render(<App counter = {counter}/>,
//ReactDOM.render(<App />,
//document.getElementById('root')
//)
//}

//setInterval(()=> {
//refresh()
//counter +=1
//}, 1000)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home" />);

// During an update, there's no need to pass the container again.
root.render(<App tab="profile" />);

root.render(<MyForm />);