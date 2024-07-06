import express from "express";
import db from "../database.js";

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, username, password } = req.body;
  const { status, message }= db.userModel.add({ name, username, password });
  if (status === false) {
    return res.status(400).json({ message });
  }
  res.json({ message: 'Registration successful' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const { status, message, user } = db.userModel.login({ username, password });
  if (status === false) {
    return res.status(400).json({ message });
  }
  res.json({ message, user });
});

router.get('/', (req, res) => {
  console.log({ headers: req.headers });
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized 1', headers: req.headers });
  }
  const token = req.headers.authorization;
  const user = db.userModel.get({
    token
  });
  if (user.length !== 1) {
    return res.status(401).json({ message: 'Unauthorized 2', headers: req.headers });
  }
  const users = db.userModel.get();
  res.json(users);
});

export default router;