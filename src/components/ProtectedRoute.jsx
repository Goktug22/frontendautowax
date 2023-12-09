import IslemService from '../services/IslemService';
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";
import {jwtDecode} from 'jwt-decode';




const PrivateRoutes = () => {

    const setSessionTimeout = (jwt) => {
        const decodedToken = jwtDecode(jwt);
        const currentTime = Date.now().valueOf() / 1000;
        console.log(  decodedToken.exp );
        if (decodedToken.exp < currentTime) {
          // Token already expired
          logoutUser();
          return;
        }

        
      
        setTimeout(() => {
          logoutUser();
        }, (decodedToken.exp - currentTime) * 1000);
      };
      
      const logoutUser = () => {
        localStorage.removeItem('jwt');
        toast.error('Oturum zaman aşımına uğradı. Lütfen tekrar giriş yapınız.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        setAuth(false);
        // Redirect to login or show session expired message
      };


    const [auth, setAuth] = useState(null); // Initialize auth as null

    useEffect(() => {
        console.log("token check");
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
        setSessionTimeout(jwt);
        } else {
        // Handle the case where there is no token
        }
        IslemService.getIslemler()
        .then(response => {

            setAuth(true); // Set auth to true on success
        })
        .catch(error => {
            toast.error('Oturum zaman aşımına uğradı. Lütfen tekrar giriş yapınız.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setAuth(false); // Set auth to false on error
        });
    }, []); // Empty dependency array means this runs once after the first render

    if (auth === null) {
        // Render nothing or a loading spinner while waiting for the auth check
        return <div></div>;
    }

    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;



