import OpenPage from './Components/OpenPage';
import Offers from './Components/Offers';
import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { NewAd } from './Components/NewAd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<OpenPage/>}/>
          <Route exact path="/offers" element={<Offers/>}/>
          <Route exact path="/newad" element={<NewAd/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
