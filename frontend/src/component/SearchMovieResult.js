import React,{useEffect, useState} from 'react'
import {gql,useLazyQuery} from '@apollo/client'
import Movie from './Movie'
import {useParams} from 'react-router-dom'
import SearchField from './SearchField'
import Pagination from './Pagination'

const SEARCH_MOVIE = gql`
query findMovieByKeyword($keyword:String!,$pageNumber:Int!){
  searchMovies(keyword:$keyword,pageNumber:$pageNumber){
    totalPage
    movies{
      tmdbID
      title
      releaseDate
      imageUrl
    }
  }
}
`

const SearchMovieResult = ()=>{
    const keyword = useParams().keyword
    const pageNumber = useParams().pageNumber
    const [currentPage,setCurrentPage] = useState(Number(pageNumber))

    const [getMovies,result] = useLazyQuery(SEARCH_MOVIE,{fetchPolicy:"network-only"})

  useEffect(()=>{
      getMovies({variables:{keyword:keyword,pageNumber:currentPage}})
  },[keyword,currentPage])


  if(result.loading){
    return  <div>Loading...</div>
  }else if(result.error){
    return <div>Can't retrieve data, please check your internet connection</div>
  }else if(result.data){
    return <div>
      <SearchField/>
      {result.data.searchMovies.movies.length !== 0 && <h3>{`Search result for "${keyword}"`}</h3>}
       <div className="movie-container">
           {result.data.searchMovies.movies.length === 0 ? 
           <p>No movie found, please try with another keyword</p> : 
           result.data.searchMovies.movies.map(movie=> <Movie key={movie.imageUrl} movie={movie}/>)
           }
       </div>
       {result.data.searchMovies.movies.length !== 0 && <Pagination currentPage={currentPage} totalPage={result.data.searchMovies.totalPage} setCurrentPage={setCurrentPage} keyword={keyword}/>}

     </div>
  }
  
  return <div></div>
  
}

export default SearchMovieResult;