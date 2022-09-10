import React from 'react';
import {Route, Routes} from 'react-router-dom';

import './App.css';
import MainPage from './components/pages/MainPage';
import DetailsPage from './components/pages/DetailsPage';
import Navigation from './components/UI/Navigation/Navigation';

function App() {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path={'/'} element={<MainPage/>}/>
        <Route path={'/post/:id'} element={<DetailsPage/>}/>
      </Routes>
    </>

  );
}

export default App;
