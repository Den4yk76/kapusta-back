import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import authRouter from './routes/api/auth';
import operationsRouter from './routes/api/operations';
import reportsRouter from './routes/api/reports';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';
import { HttpCode } from './lib/constants';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/users', authRouter);
app.use('/api/operations', operationsRouter);
app.use('/api/reports', reportsRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status =
    statusCode === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error';
  res
    .status(statusCode)
    .json({ status: status, code: statusCode, message: err.message });
});

export default app;
