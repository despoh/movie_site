import React,{useState, useEffect} from 'react'
import {useLocation,Link,useHistory} from 'react-router-dom'


const Pagination = ({currentPage,totalPage,setCurrentPage,keyword})=>{

    let location = useLocation()

    const generateIndexArray = ()=>{
        if(totalPage<10){
            return [...Array(totalPage).keys()].map((value)=>value+1);
        }

        if(currentPage<10){
            return [...Array(10).keys()].map((value)=>value+1);
        }else{
            return [...[...Array(currentPage).keys()].slice(currentPage-5),...[...Array(currentPage+5).keys()].slice(currentPage)]
        }


    }

    const [indexArray] = useState(generateIndexArray()) 



    const generatePathName = (pageNumber)=>{
        return `${location.pathname.slice(0,location.pathname.lastIndexOf('=')+1)}${pageNumber}`
    }

    
    return <div className="pagination">
        <Link className="link" to={generatePathName(currentPage-1)} onClick={()=>setCurrentPage(currentPage-1)}>{'<'}</Link>
      {indexArray && indexArray.map((value)=><Link key={`${keyword}-${value}`} className={currentPage === value ? "current-page" : "link"} to={generatePathName(value)} onClick={()=>setCurrentPage(value)}>{value}</Link>)}
        <Link className="link" to={generatePathName(currentPage+1)} onClick={()=>setCurrentPage(currentPage+1)}>{'>'}</Link>
    </div>

   
}

export default Pagination