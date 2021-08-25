import React,{useState, useEffect} from 'react'
import {gql,useQuery} from '@apollo/client'
import Movie from './Movie'


const GET_RECOMMENDATION = gql`
query getRecommendedMovies($id:Int!){
    getRecommendedMovies(id:$id){
        tmdbID
        title
        releaseDate
        imageUrl
    }
}
`

const RecommendedMovie = (props)=>{
    const result = useQuery(GET_RECOMMENDATION,{variables:{id:props.id}})
    
    const setIndex = (width)=>{
        if(window.innerWidth<=660){
            return 1
        }else if(window.innerWidth<930){
            return 2 
        }else if(window.innerWidth<1200){
            return 3
        }

        return 4
    }

    const [displayIndex,setDisplayIndex] = useState(setIndex(window.innerWidth))
    const [currentIndex,setCurrentIndex] = useState(0)

    window.addEventListener('resize', ()=> {
        setDisplayIndex(setIndex(window.innerWidth))
    });

    const buttonClick = (op)=>{
        if(op === 'next'){
            setCurrentIndex(currentIndex+ displayIndex)
        }else{
            if(currentIndex- displayIndex < 0){
                setCurrentIndex(0)
            }else{
                setCurrentIndex(currentIndex- displayIndex)
            }
        }
    }


    if(result.error){
    return <div>{`Error: ${result.error}`}</div>
    }

    if(result.data){
        if(result.data.getRecommendedMovies.length > 0){
            return <div>
            <h3>Movie we think you will like</h3>
            <div className="flex-container-button">
            {currentIndex !== 0 && <button className="next-prev-button" onClick={()=>buttonClick('prev')}>{`<`}</button>}
    <div className="movie-container">

    {result.data.getRecommendedMovies
    .slice(currentIndex,currentIndex+displayIndex)
    .map((movie)=><Movie key={movie.imageUrl}  movie={movie}/>)}
    </div>
    {(currentIndex + displayIndex <= result.data.getRecommendedMovies.length-1) && <button className="next-prev-button" onClick={()=>buttonClick('next')}>{`>`}</button>}

            </div>
  
</div>
        }
    }

    return <div></div>

  
}

export default RecommendedMovie