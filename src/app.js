import express, { json } from 'express';

import movieRoutes from './routes/movieRoutes.js';
import { constructMovieData } from './construct-movie-data.js';

constructMovieData();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, api_key'
  );
  next();
});
app.use(json());

app.use('/api/v1/movies', movieRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started on port ${port}!`);
});
