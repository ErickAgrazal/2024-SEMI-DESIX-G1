import express from "express";
import { User } from "../models";

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, password } = req.body;
  const user = new User({ name, username, password });

  try {
    user.hashPassword();
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.log({
      error,
    })
    res.status(400).json({ message: error });
  } finally {
    res.end();
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { status, message, user } = await User.login({ username, password });
  if (status === false) {
    return res.status(400).json({ message });
  }
  res.json({ message, user });
});

router.get('/', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized 1', headers: req.headers });
  }
  const token = req.headers.authorization;
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized 2', headers: req.headers });
  }
  const users = await User.find();
  res.json(users);
});

export default router;