import './App.css';
import React, { useEffect, useState } from 'react'
import MainRouter from './components/MainRouter';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
function App() {
  return (
      <BrowserRouter>
      <div>
        <MainRouter></MainRouter>
      </div>
    </BrowserRouter >
  );
}

export default App;
