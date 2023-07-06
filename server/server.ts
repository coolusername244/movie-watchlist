import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());

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

app.listen(port, () => console.log(`Server running on port ${port}`));
