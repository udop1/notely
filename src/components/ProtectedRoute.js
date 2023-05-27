// Protected route - ADAM
// Imports
import { React } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// If the user isn't logged in when using a specific component, return them to the login page
const ProtectedRoute = ({ children }) => {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
