const axios = require('axios');

const API_KEY = process.env.API_KEY;

const generateUrlForSearches = (keyword,pageNumber)=>{
    return `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${keyword}&page=${pageNumber}`
}

const generateUrlForMovie = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}

const generateUrlForGenres = ()=>{
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
}

const generateUrlForTrendingMovies = (pageNumber)=>{
    return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNumber}`
} 

const generateUrlForPopularMovies = (pageNumber)=>{
    return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
} 


const generateUrlForRecommendedMovie = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&page=1`
}

const generateUrlForCasts = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
}


module.exports = {
    axios,
    API_KEY,
    generateUrlForMovie,
    generateUrlForSearches,
    generateUrlForGenres,
    generateUrlForTrendingMovies,
    generateUrlForRecommendedMovie,
    generateUrlForCasts,
    generateUrlForPopularMovies
}


