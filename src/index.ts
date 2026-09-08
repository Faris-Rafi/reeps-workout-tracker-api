import express from 'express';

const app = express();
const port = 3000;

app.get('/ping', (_, res: { json: (arg0: { status: string }) => void }) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
