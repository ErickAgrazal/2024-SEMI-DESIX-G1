import express from 'express';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

const getFibArr = (size) => {
  const fib = (n) => {
    if (n <= 1) {
      return n;
    }
    return fib(n - 1) + fib(n - 2);
  }
  const fibArr = [];
  for (let i = 0; i < size; i++) {
    fibArr.push(fib(i));
  }
  return fibArr;
}

app.get('/', (req, res) => {
  // http://localhost:3000/?size=3
  const size = req.query.size ?? 10;
  const data = getFibArr(size);
  res.json({ data });
});

const db = [];
app.get('/ingresos', (req, res) => {
  // http://localhost:3000/ingresos?userId=1
  const { userId } = req.query;
  res.json({
    data: db.filter((item) => item.type === 'ingreso' && item.userId === userId)
  });
});

app.get('/egresos', (req, res) => {
  // http://localhost:3000/egresos?userId=1
  const { userId } = req.query;
  res.json({
    data: db.filter((item) => item.type === 'egreso' && item.userId === userId)
  });
});

app.post('/ingresos', (req, res) => {
  // http://localhost:3000/ingresos?userId=1
  // body: { amount: 100 }
  const { userId } = req.query;
  const { amount } = req.body;
  db.push({ userId, amount, type: 'ingreso' });
  res.json({ message: 'Ingreso creado' });
});

app.post('/egresos', (req, res) => {
  // http://localhost:3000/egresos?userId=1
  // body: { amount: 100 }
  const { userId } = req.query;
  const { amount } = req.body;
  db.push({ userId, amount, type: 'egreso' });
  res.json({ message: 'Egreso creado' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});