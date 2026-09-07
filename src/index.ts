const express = require('express');

const app = express();
const port = 3000;

app.get('/ping', (req: any, res: { json: (arg0: { status: string; }) => void; }) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});