const API = require('../API')
const movieGenresMap = require('../../genres')

const movieResolver = {
    Query:{
        getMovie: async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForMovie(args.id))
            return response.data
        },
        searchMovies: async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForSearches(args.keyword,args.pageNumber))
            const movies = response.data.results.filter(result=>(result.poster_path !== null && result.release_date !== ""))
            return {totalPage:response.data.total_pages,movies:movies}
        },
        getTrendingMovies : async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForTrendingMovies(args.pageNumber))
            const movies = response.data.results.filter(result=>(result.poster_path !== null && result.releaseDate !==""))
            return {totalPage:response.data.total_pages,movies:movies}
        },
        getPopularMovies : async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForPopularMovies(args.pageNumber))
            const movies = response.data.results.filter(result=>(result.poster_path !== null && result.releaseDate !==""))
            return {totalPage:response.data.total_pages,movies:movies}
        },
        getAllFavouriteMovies : async (root,args)=>{
         
            let arr = args.movieIds.map(async (id)=>{
                let response = await API.axios.get(API.generateUrlForMovie(id))
                return response.data
            })

            return arr;
        },
        getRecommendedMovies: async (root,args)=>{
            let response = await API.axios.get(API.generateUrlForRecommendedMovie(args.id))
            return response.data.results.filter((result)=>result.poster_path !== null)
        },
        getCasts: async(root,args)=>{
            let response = await API.axios.get(API.generateUrlForCasts(args.id))
            return response.data.cast.slice(0,15).filter((result)=>result.profile_path !== null)
        }
    },
    Movie:{
        tmdbID:(root)=> root.id,
        title:(root)=> root.original_title,
        hdImageUrl:(root)=> `https://image.tmdb.org/t/p/w500${root.poster_path}`,
        imageUrl:(root)=> `https://image.tmdb.org/t/p/w300${root.poster_path}`,
        description:(root)=> root.overview,
        releaseDate : (root)=>root.release_date,
        budget: (root)=>root.budget,
        genres: (root) => {
            let arr = []
            if (root.genre_ids){
                arr = root.genre_ids.map(id=>movieGenresMap.get(id))
            }else if (root.genres){
                arr = root.genres.map(root=>movieGenresMap.get(root.id))
            }
            return arr
        }
    },
    Cast:{
        imageUrl:(root)=> `https://image.tmdb.org/t/p/w200${root.profile_path}`
    }
}

module.exports = movieResolver