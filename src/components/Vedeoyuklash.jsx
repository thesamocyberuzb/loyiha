import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Vedeoyuklash() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMessage('Iltimos, video faylni tanlang!');
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('video', video);
    formData.append('user_id', 1);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'Video muvaffaqiyatli yuklandi!');
      setIsError(false);
      
      // Formani tozalash
      setTitle('');
      setDescription('');
      setCategory('');
      setVideo(null);
    } catch (error) {
      console.error('To‘liq xatolik:', error);
      setMessage(error.response?.data?.message || 'Videoni yuklashda xatolik yuz berdi!');
      setIsError(true);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Yangi video yuklash</h2>
        {message && <p className={isError ? 'error-msg' : 'success-msg'}>{message}</p>}

        <input 
          type="text" 
          placeholder="Video sarlavhasi" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />

        <textarea 
          placeholder="Video tavsifi" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />

        <input 
          type="text" 
          placeholder="Kategoriyasi (masalan: Musiqa, Kino)" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />

        <input 
          type="file" 
          accept="video/*" 
          onChange={(e) => setVideo(e.target.files[0])} 
          required 
        />

        <button type="submit">Videoni yuklash</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  form {
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h2 {
      text-align: center;
      margin-bottom: 10px;
    }

    .success-msg {
      color: green;
      text-align: center;
      font-weight: bold;
    }

    .error-msg {
      color: red;
      text-align: center;
      font-weight: bold;
    }

    input, textarea {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    textarea {
      resize: vertical;
      height: 100px;
    }

    button {
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;

export default Vedeoyuklash;