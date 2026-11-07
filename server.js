const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'thesamocyber_dbuser', // <-- cPanel'dagi O'ZINGIZNING ANIQLIKDAGI USERINGIZNI YOZING!
  password: 'tC0fK6zJ9v',
  database: 'thesamocyber_db'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL bazasiga ulanishda xatolik:', err);
    return;
  }
  console.log('MySQL bazasiga ulandi!');
});

// Registratsiya API
app.post('/api/auth/register', async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';

    db.query(query, [fullname, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(400).json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan!' });
      }
      res.status(201).json({ message: 'Muvaffaqiyatli ro‘yxatdan o‘tdingiz!' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi yuz berdi' });
  }
});

// Login API
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Email yoki parol xato!' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email yoki parol xato!' });
    }

    res.json({ message: 'Tizimga muvaffaqiyatli kirdingiz!' });
  });
});

// --- UPLOADS PAPKASINI AVTOMATIK YARATISH VA MULTER ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// Video yuklash API
app.post('/api/videos/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Video fayl yuklanmadi!' });
  }

  const { title, description, category, user_id } = req.body;
  const video_url = `/uploads/${req.file.filename}`;

  const query = 'INSERT INTO videos (title, description, category, video_url, user_id) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [title, description, category, video_url, user_id || 1], (err, result) => {
    if (err) {
      console.error('MySQL ga yozishda xatolik:', err);
      return res.status(500).json({ message: 'Videoni bazaga saqlashda xatolik yuz berdi!' });
    }
    res.status(201).json({ message: 'Video muvaffaqiyatli yuklandi!' });
  });
});

// Barcha videolarni bazadan olish API
app.get('/api/videos', (req, res) => {
  const query = 'SELECT * FROM videos ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Videolarni olishda xatolik yuz berdi!' });
    }
    res.json(results);
  });
});

// Videoni o'chirish API
app.delete('/api/videos/:id', (req, res) => {
  const videoId = req.params.id;
  const query = 'DELETE FROM videos WHERE id = ?';

  db.query(query, [videoId], (err, result) => {
    if (err) {
      console.error('Videoni o\'chirishda xatolik:', err);
      return res.status(500).json({ message: 'Videoni o\'chirib bo\'lmadi!' });
    }
    res.json({ message: 'Video muvaffaqiyatli o\'chirildi!' });
  });
});

// Serverni ishga tushirish (cPanel uchun to'g'ri port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda.`);
});