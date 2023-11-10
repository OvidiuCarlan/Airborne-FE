import { useState } from 'react'
import './App.css'
import SignUpPage from './pages/SignUpPage';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from './pages/LoginPage';


function App() {

  return (  
    <div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<SignUpPage />}/>
                <Route path='/LoginPage' element={<LoginPage/>}/>
                <Route path='/SignupPage' element={<SignUpPage/>}/>
            </Routes>
        </Router>
    </div>
    
  );
}
export default App;
