import React,{useState} from 'react'
import {gql,useQuery} from '@apollo/client'
import Cast from './Cast'

const GET_CASTS = gql`
query getCasts($id:Int!){
    getCasts(id:$id){
        name
        character
        imageUrl
    }
}
`

const Casts = (props)=>{
    let result = useQuery(GET_CASTS,{variables:{id:props.id}})

    const setIndex = (width)=>{
        if(window.innerWidth<=600){
            return 1
        }else if(window.innerWidth<800){
            return 2 
        }else if(window.innerWidth<1070){
            return 3
        }else if(window.innerWidth<1300){
            return 4
        }else if(window.innerWidth<1450){
            return 5
        }

        return 6
    }

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


    const [displayIndex,setDisplayIndex] = useState(setIndex(window.innerWidth))
    const [currentIndex,setCurrentIndex] = useState(0)
    
    window.addEventListener('resize', ()=> {
        setDisplayIndex(setIndex(window.innerWidth))
    });


    if(result.error){
        return <div>{`Error: ${result.error}`}</div>
    }

    if(result.data){
        if(result.data.getCasts.length>0){
            return <div >
            <h2>Top Casts</h2>
            <div className="flex-container-button">
            {currentIndex !== 0 && <button className="next-prev-button" onClick={()=>buttonClick('prev')}>{`<`}</button>}
            <div className="cast-container">
            {result.data.getCasts.slice(currentIndex,currentIndex+displayIndex).map((cast)=><Cast cast={cast}/>)}
            </div>
            {(currentIndex + displayIndex <= result.data.getCasts.length-1) && <button className="next-prev-button" onClick={()=>buttonClick('next')}>{`>`}</button>}
            </div>
          
    
        </div>
        }
    }

    return <div></div>
}

export default Casts