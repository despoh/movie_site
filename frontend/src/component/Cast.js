import React from 'react'

const Cast = ({cast})=>{
    return <div className="cast" >
        <div class="cast-image">
            <img src={cast.imageUrl} alt={`${cast.name}.png`}/>
        </div>
        <p style={{fontWeight:'bold'}}>{cast.name}</p>
        <p style={{color:'grey',textAlign:'left',lineHeight:'1',margin:'0'}}>{cast.character}</p>
    </div>
}

export default Cast 