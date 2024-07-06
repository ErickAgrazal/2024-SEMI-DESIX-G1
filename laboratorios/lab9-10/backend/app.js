import express from 'express';
import cors from 'cors';
import usersDeprecated from './routes/usersDeprecated.js';
import users from './routes/users.js';
import connect from './mongoose.js';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.get('/health-check', (req, res) => {
  res.json({ message: 'I am alive!' });
});

app.use('/api/users-deprecated', usersDeprecated);
app.use('/api/users', users);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect();
});
