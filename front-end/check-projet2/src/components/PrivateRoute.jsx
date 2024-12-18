import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ element: Component }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? Component : <Navigate to="/signIn" replace />;

};

export default PrivateRoute;
