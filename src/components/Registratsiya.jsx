import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registratsiya() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Backendga ma'lumotni yuborish
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullname,
        email,
        password
      });
      
      alert(response.data.message);

      // 2. Muvaffaqiyatli to'ldirilgandan keyin Bosh sahifani ochish
      navigate('/bosh_Sahifa');

    } catch (error) {
      alert(error.response?.data?.message || "Xatolik yuz berdi!");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>"Registratsiya qilish"</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <label>Ismigizni kiriting</label><br />
          <input 
            type="text" 
            value={fullname} 
            onChange={(e) => setFullname(e.target.value)} 
            placeholder="Ismingizni kiriting"
            required
            style={{ padding: '8px', width: '250px', marginBottom: '15px' }}
          />
        </div>

        <div>
          <label>Email kiriting</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Elektron pochta kiriting"
            required
            style={{ padding: '8px', width: '250px', marginBottom: '15px' }}
          />
        </div>

        <div>
          <label>parol kiriting</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="parol kiriting"
            required
            style={{ padding: '8px', width: '250px', marginBottom: '15px' }}
          />
        </div>

        <div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0000aa', color: '#fff', border: 'none', cursor: 'pointer', width: '100%' }}>
            Yuborish
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registratsiya;