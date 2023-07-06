import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'here' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
