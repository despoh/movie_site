import React from 'react'
import {useHistory} from 'react-router-dom'


const Movie = ({movie})=>{


    const history = useHistory()

    const onMovieClick = (id)=>{
        history.push(`/movie/${id}`)
      }

    return (<div className="movie" onClick={()=>onMovieClick(movie.tmdbID)}>
        <img src={movie.imageUrl} alt={`thumbnail-${movie.title}`}/>
        <h3>{movie.title}</h3> {movie.releaseDate}
    </div>)
}

export default Movie