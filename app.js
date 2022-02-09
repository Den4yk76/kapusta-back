import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import authRouter from './routes/api/auth';
import operationsRouter from './routes/api/operations';
import reportsRouter from './routes/api/reports';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/users', authRouter);
app.use('/api/operations', operationsRouter); // Denys изменил эту строчку. Было так - app.use('/api/income', operationsRouter);
app.use('/api/reports', reportsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
