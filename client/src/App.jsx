import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import './App.scss';
import { useState } from "react";
import Login from "./pages/Login/Login";
import UserDashboard from "./pages/Dashboard/Dashboard";
import Splash from "./pages/Splash/Splash";

function App() {
  // token
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/dashboard" element={<UserDashboard token={token}/>} />
      </Routes>
    </BrowserRouter>
   
  );
}


export default App;
