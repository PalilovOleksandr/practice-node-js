import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.json;
  ({ message: 'Hello world!' });
});

app.listen(PORT, () => {
  console.log(`${PORT} it's ok`);
});
