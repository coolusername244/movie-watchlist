import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  database: 'movie_watchlist',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  user: 'salt-dev',
  password: 'postgres',
});

const authKey = process.env.AUTH_KEY as string;

const nowPlayingUrl =
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

const topRatedMoviesUrl =
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

const upcomingUrl =
  'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: authKey,
  },
};

app.get('/api/new-releases', async (_req, res) => {
  const response = await axios.get(nowPlayingUrl, options);
  res.json(response.data.results);
});

app.get('/api/top-rated', async (_req, res) => {
  const response = await axios.get(topRatedMoviesUrl, options);
  res.json(response.data.results);
});

app.get('/api/upcoming', async (_req, res) => {
  const response = await axios.get(upcomingUrl, options);
  res.json(response.data.results);
});

app.post('/api/users', async (req, res) => {
  const username = req.body.username;
  const client = await pool.connect();
  await client.query('INSERT INTO users (username) VALUES ($1)', [username]);
  client.release();
  res.status(201).send();
});

app.listen(port, () => console.log(`Server running on port ${port}`));
