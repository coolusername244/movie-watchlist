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
  console.log(username);
  const client = await pool.connect();
  try {
    const exists = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
    );
    if (exists.rows.length > 0) {
      res.status(400).json({ error: 'user already exists' });
    } else {
      await client.query('INSERT INTO users (username) VALUES ($1)', [
        username,
      ]);
      res.status(201).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'something went wrong' });
  } finally {
    client.release();
  }
});

app.get('/api/users', async (req, res) => {
  const username = req.query.username;
  console.log(username);
  const client = await pool.connect();
  try {
    const exists = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
    );
    if (exists.rows.length > 0) {
      res.status(200).send();
    } else {
      res.status(400).json({ error: 'user does not exist' });
    }
  } catch (error) {
    res.status(500).send({ error: 'something went wrong' });
  } finally {
    client.release();
  }
});

app.get('/api/movie', async (req, res) => {
  const query = req.query.query;
  console.log(query);
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options,
  );
  console.log(response);
  res.json(response.data.results);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
