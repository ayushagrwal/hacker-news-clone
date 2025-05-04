/**
 * PrivateRoutes Component
 * 
 * A route wrapper that protects routes requiring authentication
 * Redirects unauthenticated users to the login page
 * Used as a parent route in the router configuration
 */
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // Check if user has an authentication token in localStorage
    const token = localStorage.getItem('accessToken');
    
    // If token exists, render the child routes (Outlet)
    // Otherwise, redirect to login page
    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;