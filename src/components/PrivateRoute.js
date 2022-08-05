import React from 'react'
import {
    Navigate,
    Outlet,
  } from 'react-router-dom';

function PrivateRoute({user, redirectPath}) {
    if(!user) {
            return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />
}

export default PrivateRoute