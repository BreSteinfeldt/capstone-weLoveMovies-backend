const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  res.json({ data: await moviesService.list(req.query.is_showing) });
}

async function theatersList(req, res, next) {
    res.json({data: await moviesService.theatersList(req.params.movieId)})
}

async function reviewsList(req, res, next) {
    res.json({data: await moviesService.reviewsList(req.params.movieId)})
}

async function movieExists(req, res, next){
 const movie = await moviesService.read(req.params.movieId); 
 if(movie){
    res.locals.movie = movie; 
    return next(); 
 }
 next({status: 404, message: `Movie cannot be found.`})
}

async function read(req, res, next) {
   const { movie: data } = res.locals; 
   res.json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)], 
  theatersList: asyncErrorBoundary(theatersList), 
  reviewsList: asyncErrorBoundary(reviewsList),
};
