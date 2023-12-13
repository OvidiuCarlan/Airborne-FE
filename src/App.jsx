import { useState } from 'react'
import './App.css'
import SignUpPage from './pages/SignUpPage';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import { UserProfilePage } from './pages/UserProfilePage';
import MessagePage from './pages/MessagePage';


function App() {

  return (  
    <div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<SignUpPage />}/>
                <Route path='/LoginPage' element={<LoginPage/>}/>
                <Route path='/SignupPage' element={<SignUpPage/>}/>
                <Route path='/LandingPage' element={<LandingPage/>}/>
                <Route path='/Profile' element={<ProfilePage/>}/>
                <Route path='/UserProfilePage/:id' element={<UserProfilePage/>}/>
                <Route path='/Home' element={<LandingPage/>}/>
                <Route path='/Messages' element={<MessagePage/>}/>
            </Routes>
        </Router>
    </div>
    
  );
}
export default App;
