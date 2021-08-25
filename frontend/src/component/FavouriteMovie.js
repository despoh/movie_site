import React, { useEffect } from 'react'
import {gql,useLazyQuery} from '@apollo/client'
import Movie from './Movie'
import filled_heart from '../resources/filled_heart.png'


const GET_FAVOURITE = gql`
query getAllFavouriteMovies($movieIds:[Int]!){
    getAllFavouriteMovies(movieIds:$movieIds){
        tmdbID
        title
        description
        imageUrl
    }
  }
`

const FavouriteMovie = (props)=>{
    const [getFavouriteMovies,result] = useLazyQuery(GET_FAVOURITE)

    useEffect(()=>{
        if(props.user){
            getFavouriteMovies({variables:{movieIds:props.user.favouriteMovies}})
        }

    },[props.user])
    
    if(result.loading){
        return <div>Loading...</div>
    }else if(result.error){
        return <div>Error occured!</div>
    }
    
    if(result.data && props.user){
        return <div>
        <h2 className="title-banner">Favourite</h2>
        <div className="movie-container">
            {result.data.getAllFavouriteMovies.map(movie=> <Movie key={movie.tmdbID} movie={movie}/>)}
        </div>
        </div>
    
    
    }

    return <div>Please log in to see your favourite!</div>
    }
   

export default FavouriteMovie