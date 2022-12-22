const movies = [];
for (let page = 1; page < 250; page++) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&with_original_language=en&vote_average.gte=8.0&vote_count.gte=500&sort_by=vote_average.desc`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY0ZDU3MjFhOTFiZjg3NGI3NGE4MmJkNDQyMjJmOCIsInN1YiI6IjYzNmU4YWNjODEzODMxMDA4YjdiZjA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WrisPdHnBzT9lHEpUov7h11PT4M_jR8V9uXA6nJn0Cg',
      },
    }
  )
    .then((res) => res.json())
    .then((json) => movies.push(json));
}

console.log(movies.length);
