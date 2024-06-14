import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Please use a POST request instead.' });
});

app.post('/', (req, res) => {
  const { name="Isaac" } = req.body;
  res.json({ message: `Hello ${name}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
