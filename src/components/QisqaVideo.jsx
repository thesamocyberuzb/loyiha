import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function QisqaVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Barcha videolarni olib kelamiz (yoki kategoriya/format bo'yicha filter qilish mumkin)
    axios.get('http://localhost:5000/api/videos')
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Videolarni yuklashda xatolik:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <h2>Qisqa videolar (Shorts)</h2>
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : videos.length === 0 ? (
        <p>Hozircha qisqa videolar mavjud emas.</p>
      ) : (
        <ShortsFeed>
          {videos.map(video => (
            <ShortCard key={video.id}>
              <video 
                src={`http://localhost:5000${video.video_url}`} 
                controls 
                loop 
              />
              <VideoInfo>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <span className="badge">{video.category || 'Shorts'}</span>
              </VideoInfo>
            </ShortCard>
          ))}
        </ShortsFeed>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const ShortsFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const ShortCard = styled.div`
  width: 100%;
  max-width: 360px;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);

  video {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
  }
`;

const VideoInfo = styled.div`
  padding: 15px;
  color: white;
  background: #181818;

  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 10px;
  }

  .badge {
    background: #007bff;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
`;

export default QisqaVideo;