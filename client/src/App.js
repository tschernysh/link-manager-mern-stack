import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './components/Routes';
import s from './App.module.css'

function App() {
  const routes = useRoutes(false)
  return (
    <BrowserRouter>
      <div className={s.gradient} ></div>
      <div className={s.container}>
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
