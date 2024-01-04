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
import LoginComponent from './components/LoginComponent';

import PrivateRoutes from './components/ProtectedRoute';
import InventoryComponent from './components/InventoryComponent';
import LastikOtelComponent from './components/LastikOtelComponent';
import PublicRoutes from './components/UnprotectedRoute';
import PersonelComponent from './components/PersonelComponent';
import UcretliOtoparkComponent from './components/UcretliOtoparkComponent';
import SaleComponent from './components/SaleComponent';
import HarcamaComponent from './components/HarcamaComponent';
import CalendarComponent from './components/CalendarComponent';


// Other imports...




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

            <Route element={<PublicRoutes />}> 
              <Route path="/login" element={<LoginComponent />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element = {<Navigate to="/login" />}/>
              <Route path="/home" element = {   <ListEmployeeComponent/> }/>
              <Route path="/islemler" element = {  <IslemlerComponent/> }/>
              <Route path="/personel" element = {  <PersonelComponent/> }/>
              <Route path="/aracislemler" element = {<AracislemlerComponent/>}/>
              <Route path="/envanter" element = {<InventoryComponent/>}/>
              <Route path="/lastikotel" element = {<LastikOtelComponent/>}/>
              <Route path="/ucretliotopark" element = {<UcretliOtoparkComponent/>}/>
              <Route path="/satis" element = {<SaleComponent/>}/>
              <Route path="/harcama" element = {<HarcamaComponent/>}/>
              <Route path="/takvim" element = {<CalendarComponent/>}/>
            </Route>

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
