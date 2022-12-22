import { moviesArray as movies } from '../construct-movie-data.js';
import { getRandomInt } from '../util/random.js';

const getMovieImages = async (req, res, next) => {
  const id = req.params.id;
  console.log('!!!!');
  console.log(id);
  const fetchRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
      },
    }
  );

  const resData = await fetchRes.json();

  // if (resData.total_results === 0) {
  //   return res.status(404).json({
  //     message: 'not found',
  //     data: resData,
  //   });
  // }

  return res.status(200).json({
    message: 'search successfull',
    data: resData,
  });
};

const getByTitle = async (req, res, next) => {
  const title = req.params.title;
  const fetchRes = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
      },
    }
  );

  const resData = await fetchRes.json();

  if (resData.total_results === 0) {
    return res.status(404).json({
      message: 'not found',
      data: resData,
    });
  }

  return res.status(200).json({
    message: 'search successfull',
    data: resData,
  });
};

const getRandomMovieWithImages = async (req, res, next) => {
  const language = req.query.language;
  let resMovie;
  let resImages;

  const randomIndex = getRandomInt(0, movies.length - 1);
  const randomId = movies[randomIndex].id;
  const fetchMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${randomId}?language=${language}`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
      },
    }
  );

  resMovie = await fetchMovie.json();

  console.log(resMovie.imdb_id);
  const fetchImages = await fetch(
    `https://imdb-api.com/en/API/Images/k_a399m5go/${resMovie.imdb_id}`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
      },
    }
  );
  resImages = await fetchImages.json();
  resMovie.images = resImages;

  res.status(200).json({
    message: 'successfully get movie',
    data: resMovie,
  });
};

const getRandomMovies = async (req, res, next) => {
  const quantity = req.query.quantity || 1;
  const language = req.query.language || 'ru';
  let resMovie;
  let resImages;
  let resData = {
    movies: [],
  };
  for (let i = 0; i < quantity; i++) {
    do {
      const randomIndex = getRandomInt(0, movies.length - 1);
      const randomId = movies[randomIndex].id;
      const fetchMovie = await fetch(
        `https://api.themoviedb.org/3/movie/${randomId}?language=${language}`,
        {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
          },
        }
      );

      resMovie = await fetchMovie.json();
      const releaseDate = resMovie.release_date.slice(
        0,
        resMovie.release_date.indexOf('-')
      );

      resData.movies.push({
        title: resMovie.title,
        imdb_id: resMovie.imdb_id,
        overview: resMovie.overview,
        releaseDate: releaseDate,
      });

      const fetchImages = await fetch(
        `https://api.themoviedb.org/3/movie/${resMovie.id}/images`,
        {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
          },
        }
      );
      resImages = await fetchImages.json();
      if (resImages.backdrops.length === 0) continue;
      resData.movies[i].images = resImages.backdrops.map((backdrope) => {
        return `https://image.tmdb.org/t/p/original${backdrope.file_path}`;
      });
    } while (resImages.backdrops.length === 0);
  }
  res.status(200).json({
    message: 'successfully get movie',
    data: resData,
  });
};

export {
  getByTitle,
  getMovieImages,
  getRandomMovieWithImages,
  getRandomMovies,
};
