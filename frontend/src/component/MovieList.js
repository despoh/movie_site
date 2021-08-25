import React,{useState} from 'react'
import {gql,useQuery} from '@apollo/client'
import Movie from './Movie'
import {useParams} from 'react-router-dom'
import Pagination from './Pagination'

const TRENDING_MOVIE = gql`
query getTrendingMovies($pageNumber:Int!){
    getTrendingMovies(pageNumber:$pageNumber){
        totalPage
        movies{
         tmdbID
        title
        releaseDate
        imageUrl
    }
    }
}`

const POPULAR_MOVIE = gql`
query getPopularMovies($pageNumber:Int!){
    getPopularMovies(pageNumber:$pageNumber){
        totalPage
        movies{
         tmdbID
        title
        releaseDate
        imageUrl
    }
    }
}`


const MovieList = (props)=>{

    const pageNumber = Number(useParams().pageNumber)
    const [currentPage,setCurrentPage] = useState(pageNumber)


    let result = useQuery(props.mode === "popular" ? POPULAR_MOVIE : TRENDING_MOVIE,{variables:{pageNumber},fetchPolicy:"network-only"})
    let queryResult = null

    if(result.loading){
        return <div>Loading...</div>
    }else if(result.error){
        return <div>Can't retrieve data, please check your internet connection</div>
    }else if(result.data){
        queryResult = props.mode === "popular"? result.data.getPopularMovies : result.data.getTrendingMovies
    }
    
 
    return <div>
    <h2 className="title-banner">{props.mode === "popular" ? "Popular Movies": "Trending Movies"}</h2>
    <div className="movie-container">
        {queryResult.movies.map(movie=> <Movie key={movie.tmdbID} movie={movie}/>)}
    </div>
    <Pagination currentPage={currentPage} totalPage={queryResult.totalPage} setCurrentPage={setCurrentPage}/>
</div>
    
}

export default MovieList