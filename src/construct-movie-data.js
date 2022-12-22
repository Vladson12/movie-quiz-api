const moviesArray = [];

const originalLanguage = '';
const voteAverageGte = '';
const voteCountGte = '3000';
const sortBy = 'vote_average.desc';

const constructMovieData = async () => {
  let totalPages = 1;
  const fetchInfoWithParams = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=1&with_original_language=${originalLanguage}&vote_average.gte=${voteAverageGte}&vote_count.gte=${voteCountGte}&sort_by=${sortBy}`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
      },
    }
  );
  const infoWithParams = await fetchInfoWithParams.json();
  totalPages = infoWithParams.total_pages;

  for (let page = 1; page <= totalPages; page++) {
    const fetchMoviePageWithParams = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${page}&with_original_language=${originalLanguage}&vote_average.gte=${voteAverageGte}&vote_count.gte=${voteCountGte}&sort_by=${sortBy}`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
        },
      }
    );
    const moviePageWithParams = await fetchMoviePageWithParams.json();
    moviePageWithParams.results.forEach((res) => {
      moviesArray.push({
        id: res.id,
        originalTitle: res.original_title,
      });
    });
  }

  console.log(moviesArray.length);
};

export { moviesArray, constructMovieData };
