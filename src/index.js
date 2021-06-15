import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TableRepos from './components/TableRepos'
import Header from './components/Header'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <TableRepos />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
