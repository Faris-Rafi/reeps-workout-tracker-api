// eslint-disable-next-line import-x/no-rename-default
import routes from './routes/v1/index.ts';
import express, { json } from 'express';
import { config } from './config/config.ts';
import moment from 'moment-timezone';

moment().tz('Asia/Jakarta').format();

const app = express();
const { port } = config;

app.use(json());

app.use('/v1', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Reeps API is running 🏋️' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
