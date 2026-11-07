import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Registratsiya from './components/Registratsiya';
import Boshsahifa from './components/BoshSahifa';
import Qisqavideo from './components/QisqaVideo';
import Vedeoyuklash from './components/Vedeoyuklash';
import Qidiruv from './components/Qidiruv';
import Statistika from './components/Statistika';
import SozlamaProfil from './components/SozlamaProfil';

function AppLayout() {
  const location = useLocation();
  
  // Agar manzil "/" (Registratsiya) bo'lsa, sidebar ko'rsatilmaydi
  const isAuthPage = location.pathname === '/';

  return (
    <div className="App">
      {/* Faqat registratsiya sahifasidan boshqa joylarda sidebar chiqadi */}
      {!isAuthPage && (
        <div className="sidebar">
          <h3>Navo</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 20px' }}>
            <Link to="/bosh_Sahifa">Bosh Sahifa</Link>
            <Link to="/qisqa_Video">Qisqa Video</Link>
            <Link to="/vedeo_Yuklash">Vedeo Yuklash</Link>
            <Link to="/qidiruv">Qidiruv</Link>
            <Link to="/statistika">Statistika</Link>
            <Link to="/sozlama_Profil">Sozlama Profil</Link>
          </div>
        </div>
      )}

      {/* Registratsiya sahifasida content 100% enni egallaydi */}
      <div className="content" style={{ width: isAuthPage ? '100%' : '80%' }}>
        <Routes>
          <Route path="/" element={<Registratsiya />} />
          <Route path="/bosh_Sahifa" element={<Boshsahifa />} />
          <Route path="/qisqa_Video" element={<Qisqavideo />} />
          <Route path="/vedeo_Yuklash" element={<Vedeoyuklash />} />
          <Route path="/qidiruv" element={<Qidiruv />} />
          <Route path="/statistika" element={<Statistika />} />
          <Route path="/sozlama_Profil" element={<SozlamaProfil />} />
        </Routes>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>
);