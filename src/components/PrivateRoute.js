import React from 'react'
import {
    Routes,
    Route,
    Link,
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