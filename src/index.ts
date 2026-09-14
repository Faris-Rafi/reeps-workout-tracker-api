import express, { json } from 'express';
// eslint-disable-next-line import-x/no-rename-default
import routes from './routes/v1/index.ts';
// import { ApiError } from './utils/ApiError.ts';
// import { status as httpStatus } from 'http-status';
import { config } from './config/config.ts';

const app = express();
const { port } = config;

app.use(json());

app.use('/v1', routes);

// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

app.get('/', (req, res) => {
  res.json({ message: 'Reeps API is running 🏋️' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
