import React, { useState } from 'react';
import styled from 'styled-components';

function SozlamaProfil() {
  const [fullname, setFullname] = useState('Admin User');
  const [email, setEmail] = useState('admin@navo.uz');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMsg('Profil ma\'lumotlari muvaffaqiyatli saqlandi!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <Wrapper>
      <h2>Profil Sozlamalari</h2>
      
      <form onSubmit={handleSave}>
        {successMsg && <div className="success-banner">{successMsg}</div>}

        <div className="input-group">
          <label>F.I.O. (Ism familiya)</label>
          <input 
            type="text" 
            value={fullname} 
            onChange={(e) => setFullname(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Elektron pochta (Email)</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Yangi parol</label>
          <input 
            type="password" 
            placeholder="Parolni o'zgartirish uchun yozing" 
          />
        </div>

        <button type="submit">O'zgarishlarni saqlash</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 25px;
    color: #333;
  }

  form {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    gap: 20px;

    .success-banner {
      background: #d4edda;
      color: #155724;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 14px;
        font-weight: 600;
        color: #555;
      }

      input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 15px;

        &:focus {
          border-color: #007bff;
          outline: none;
        }
      }
    }

    button {
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;

export default SozlamaProfil;