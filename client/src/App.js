import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import s from './App.module.css'
import Navbar from './components/Navbar/Navbar';
import Routes from './components/Routes';
import { AlertContext } from './context/alertContext';
import { AuthContext } from './context/authContext';
import { useAuth } from './hooks/auth.hook';



function App() {

  const {token,login,logout, userId} = useAuth()
  const isAuth = !!token
  const [appError, setAppError] = useState(null)
  const [appOk, setAppOk] = useState(null)

  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
      <AlertContext.Provider value={{setAppError, setAppOk}}>
        <BrowserRouter>
          <div className={`${s.gradient} ${appError ? s.error_gradient : appOk ? s.good_gradient : s.ok_gradient}`}/>
          <div className={s.message_log} >{appError ? appError : appOk ? appOk : null}</div>
          <div className={s.container}>
            {isAuth ? <Navbar /> : null}
            <Routes  isAuth={isAuth} />
          </div>
        </BrowserRouter>
      </AlertContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
