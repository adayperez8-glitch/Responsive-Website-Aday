// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {  
  
  return moviesArray.map(function (movie) {
  return movie.director;
  });

}


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(function(movie) {

return movie.director==='Steven Spielberg' && movie.genre.includes('Drama')

}).length

}


// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length ===0) return 0;
  const totalScore = moviesArray.reduce (function (acumulador,pelicula)
  {
    if (pelicula.score) {return acumulador + pelicula.score;
     } else {
      return acumulador;
    }
  }, 0);
  const average = totalScore/moviesArray.length;
  return Number(average.toFixed(2));
  }


  


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(function(movie) {
    return movie.genre.includes('Drama');
  });

  if (dramaMovies.length === 0) return 0;

  const totalDramaScore = dramaMovies.reduce(function(acumulador, pelicula) {
    if (pelicula.score) {
      return acumulador + pelicula.score;
    } else {
      return acumulador;
    }
  }, 0)

  const average = totalDramaScore / dramaMovies.length;
  return Number(average.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const copia = [...moviesArray]
copia.sort(function(a, b) {
  if (a.year === b.year) {
    return a.title.localeCompare(b.title)
  }
  return a.year - b.year
})
return copia
}
// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
   const copia = [...moviesArray]
copia.sort(function(a, b) {
    return a.title.localeCompare(b.title)
  })
const resultado = copia.slice(0,20)
return resultado.map(function(movie)
{return movie.title})
}


// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {}
