import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import './App.scss';
import { useState } from "react";
import Login from "./pages/Login";


function App() {
  // token
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
