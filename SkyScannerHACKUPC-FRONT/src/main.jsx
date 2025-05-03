import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import CreateUser from './CreateUser';
import './index.css';
import UserSelection from './UserSelection';
import CreateParty from './CreateParty';
import JoinParty from './JoinParty';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/select" element={<UserSelection />} />
        <Route path="/party" element={<CreateParty />} />
        <Route path="/joinparty" element={<JoinParty />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
