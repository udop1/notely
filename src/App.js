import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <h1>Firebase Auth</h1>
      <AuthContextProvider>
        <Routes>
          {/*<Route path='/' element={<Homepage />} />*/}
          <Route path='/login' element={<Signin />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
