import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Statistika() {
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Videolar sonini hisoblash uchun ma'lumotlarni tortib kelamiz
    axios.get('http://localhost:5000/api/videos')
      .then((response) => {
        setTotalVideos(response.data.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Statistikani yuklashda xatolik:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Wrapper>
      <h2>Platforma Statistikasi</h2>
      
      <div className="stats-grid">
        <StatCard>
          <h3>Jami videolar</h3>
          <p>{loading ? '...' : totalVideos}</p>
        </StatCard>
        
        <StatCard>
          <h3>Faol foydalanuvchilar</h3>
          <p>1</p>
        </StatCard>

        <StatCard>
          <h3>Kategoriyalar</h3>
          <p>Faol</p>
        </StatCard>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }
`;

const StatCard = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  text-align: center;
  border-top: 4px solid #007bff;

  h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }

  p {
    font-size: 28px;
    font-weight: bold;
    color: #007bff;
  }
`;

export default Statistika;