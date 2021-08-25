import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client'
import {useHistory} from 'react-router-dom'
import { queries } from '@testing-library/react'
import empty_heart from '../resources/empty_heart.png'
import filled_heart from '../resources/filled_heart.png'
import RecommendedMovie from './RecommendMovie'
import Casts from './Casts'
import back_icon from '../resources/back.png'

const GET_MOVIE = gql`
query getMovie($id:Int!){
  getMovie(id:$id){
    tmdbID
    title
    releaseDate
    hdImageUrl
    genres
    description
    original_language
    runtime
  }
}
`

const UPDATE_FAVOURITE = gql`
mutation updateFavouriteMovies($tmdbId:Int!){
    updateFavouriteMovies(tmdbId:$tmdbId){
        favouriteMovies
        isAppend
    }
}
`

const GET_CURRENT_USER = gql`
query{
  me{
    username
    id
    favouriteMovies
  }
}
`

const MovieDetail = (props) => {

    const id = Number(useParams().id)
    const history = useHistory()

    const queryResult = useQuery(GET_MOVIE, { variables: { id }})

    const [updateFavourites,mutationResult] = useMutation(UPDATE_FAVOURITE,{
        onError: (error)=>{
            console.log(error)
        }
    })


    const AddToFavourites = ()=>{
        updateFavourites({variables:{tmdbId:id}})
        history.go(0)
    }

    const convertMinutesToHourFormat = (min)=>{
        let mm = min % 60
        let hh = (min-mm)/60

        if(hh === 0){
            return `${mm}m`
        }

        if(mm<10){
            mm = '0' + mm
        }

        return `${hh}h:${mm}m`
    }

    if (queryResult.loading) return <div>Loading...</div>

    if(queryResult.data){
        const movie = queryResult.data.getMovie

        return <div>
        
        <div className="icon-inline-container" onClick={() => history.goBack()}><img src={back_icon} alt="back-icon.png"></img></div>
        <div className="flex-container-movie-detail">
        <div className="img-movie-detail">
            <img src={movie.hdImageUrl} alt="pic" />
            
        </div>
        <div className="info-container-movie-detail">
            <div className="title-movie-detail">
                <h1>{movie.title}</h1>
                <h5>{movie.genres.filter(genre=>genre !== null).join(', ')}</h5>
                <h5>Playing Time: { convertMinutesToHourFormat(movie.runtime)} </h5>
                
            </div>
            <div className="overview-movie-detail">
                <h2>Overview</h2>
                <p>{movie.description}</p>
                {props.user ? <div className="icon-inline-container" onClick={AddToFavourites}>{props.user.favouriteMovies.includes(id) ? <img src={filled_heart}></img>: <img src={empty_heart}></img>}</div> : <p style={{color:'red'}}>Login to favourite this movie!</p>}

            </div>
        </div>

        </div>
        <Casts id={id}/>
        <RecommendedMovie id={id}/>
    </div>
    }

    return <div></div>
 


}

export default MovieDetail