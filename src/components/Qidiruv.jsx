import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Qidiruv() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Serverdan barcha videolarni olib kelamiz
  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(res => {
        setVideos(res.data);
      })
      .catch(err => {
        console.error('Videolarni olishda xatolik:', err);
      });
  }, []);

  // Qidiruv so'ziga mos keluvchi videolarni saralash
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (video.category && video.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Videolarni qidirish</h2>
      
      {/* Qidirish ivi */}
      <input 
        type="text" 
        placeholder="Video sarlavhasi yoki kategoriyasi bo'yicha qidiring..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      {/* Topilgan videolar ro'yxati */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <div key={video.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff' }}>
              <video width="100%" controls src={`http://localhost:5000${video.video_url}`} style={{ borderRadius: '5px' }}></video>
              <h3 style={{ fontSize: '18px', margin: '10px 0 5px 0' }}>{video.title}</h3>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>{video.description}</p>
              <span style={{ background: '#e0e0e0', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
                {video.category}
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: '#777' }}>Hech qanday video topilmadi.</p>
        )}
      </div>
    </div>
  );
}

export default Qidiruv;