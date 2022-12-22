import { Router } from 'express';

import {
  getRandomMovies,
  getByTitle,
  getMovieImages,
} from '../controllers/movieController.js';

const router = Router();

router.get('/random', getRandomMovies);
router.get('/:title', getByTitle);
router.get('/:id/images', getMovieImages);

export default router;
