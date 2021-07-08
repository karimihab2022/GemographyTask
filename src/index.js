import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Apphooks from "./Apphooks"

/*I made the task with react class componente and also react hooks you will find (App) file this is the 
  class component and (Apphooks) file this use hooks and use getdata file to git the data 

to test the both I am importing both in the index file please try both of them*/

ReactDOM.render(
  <React.StrictMode>
   {/* <App/>*/}  
    <Apphooks/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
