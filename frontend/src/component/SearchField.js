import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'


const SearchField = ()=>{

  const [errorMsg,setErrorMsg] = useState("")
  const history = useHistory()

  const inputChange = (event)=>{
    if(event.key === 'Enter'){
      if(event.target.value === ""){
        setErrorMsg("Please type keyword")
      }else{
        history.push(`/search/k=${event.target.value}&page=1`)
      }
    }
  }

  return <div>
    {errorMsg}
    <input type="text" 
          placeholder="Search movie with title" 
          className="keyword-input"
          onKeyDown = {inputChange}
          ></input>
    </div>
}

export default SearchField