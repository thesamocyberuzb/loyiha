import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function BoshSahifa() {
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    axios.get('http://localhost:5000/api/videos')
      .then((response) => {
        setVideos(response.data);
        // Har bir video uchun boshlang'ich like sonini 0 qilib belgilaymiz
        const initialLikes = {};
        response.data.forEach(v => { initialLikes[v.id] = 0; });
        setLikes(initialLikes);
      })
      .catch((error) => {
        console.error('Videolarni yuklashda xatolik:', error);
      });
  };

  // Like bosish funksiyasi
  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  // Videoni o'chirish funksiyasi
  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham bu videoni o'chirmoqchimisiz?")) {
      try {
        await axios.delete(`http://localhost:5000/api/videos/${id}`);
        // Ekranni yangilash uchun ro'yxatdan olib tashlaymiz
        setVideos(videos.filter(video => video.id !== id));
      } catch (error) {
        console.error("Videoni o'chirishda xatolik:", error);
        alert("Videoni o'chirib bo'lmadi!");
      }
    }
  };

  return (
    <Wrapper>
      <h2>Platformadagi videolar</h2>
      <div className="video-grid">
        {videos.length === 0 ? (
          <p>Hozircha videolar mavjud emas.</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="video-card">
              <video controls src={`http://localhost:5000${video.video_url}`} width="100%" />
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              
              <div className="card-footer">
                <span className="category">Kategoriya: {video.category || 'Yo\'q'}</span>
                
                <div className="action-buttons">
                  <button className="like-btn" onClick={() => handleLike(video.id)}>
                    ❤️ {likes[video.id] || 0}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(video.id)}>
                    🗑️ O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .video-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    video {
      border-radius: 4px;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }

    .card-footer {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: auto;
    }

    .category {
      font-size: 12px;
      background: #e0e0e0;
      padding: 3px 8px;
      border-radius: 4px;
      align-self: flex-start;
    }

    .action-buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      button {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
      }

      .like-btn {
        background-color: #ffe6e6;
        color: #d9534f;
        flex: 1;

        &:hover {
          background-color: #ffcccc;
        }
      }

      .delete-btn {
        background-color: #f8d7da;
        color: #721c24;
        flex: 1;

        &:hover {
          background-color: #f5c6cb;
        }
      }
    }
  }
`;

export default BoshSahifa;