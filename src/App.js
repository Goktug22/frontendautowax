import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route, Navigate} from "react-router";
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import IslemlerComponent from './components/IslemlerComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Router>
      
      <ToastContainer />
        <HeaderComponent />
        <div className='blue-gradient'> 
        <div className='container'>
          <Routes>
            <Route path="/" element = {<Navigate to="/home" />}/>
            <Route path="/home" element = {<ListEmployeeComponent/>}/>
            <Route path="/islemler" element = {<IslemlerComponent/>}/>

          </Routes>
        </div>
        </div>
        <FooterComponent />
      

      </Router>
    </div>
  );
}

export default App;
