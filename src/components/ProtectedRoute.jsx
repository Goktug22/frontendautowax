import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = () => {
        console.log("inprotected");
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        return !!token;
    };
    

    if (!isAuthenticated) {
        // Redirect to login page
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
