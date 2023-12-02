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
import AracislemlerComponent from './components/AracIslemlerComponent';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function App() {
  return (
    <div>
      <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastContainer />
        <HeaderComponent />
        <div className='blue-gradient'> 
        <div className='container'>
          <Routes>
            <Route path="/" element = {<Navigate to="/home" />}/>
            <Route path="/home" element = {<ListEmployeeComponent/>}/>
            <Route path="/islemler" element = {  
            
            
            <IslemlerComponent/>
            
            }/>
            <Route path="/aracislemler" element = {<AracislemlerComponent/>}/>

          </Routes>
        </div>
        </div>
        </LocalizationProvider>
        <div className='blue-gradient' style={ { height: '50px'}}>

        </div>
        <FooterComponent />
      

      </Router>
    </div>
  );
}

export default App;
