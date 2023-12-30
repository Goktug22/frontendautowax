import IslemService from '../services/IslemService';
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';




const PublicRoutes = () => {


    const [auth, setAuth] = useState(null); // Initialize auth as null

    useEffect(() => {

       
        IslemService.getIslemler()
        .then(response => {
            setAuth(true); // Set auth to true on success
        })
        .catch(error => {
           
            setAuth(false); 
        });
    }, []); // Empty dependency array means this runs once after the first render

    if (auth === null) {
        // Render nothing or a loading spinner while waiting for the auth check
        return <div></div>;
    }

    return auth ? <Navigate to="/home" /> :    <Outlet />  ;
};

export default PublicRoutes;



