import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route,Link,Redirect, useHistory} from 'react-router-dom'
import './styles.css'
import SearchField from './component/SearchField';
import MovieList from './component/MovieList'
import MovieDetail from './component/MovieDetail'
import SearchMovieResult from './component/SearchMovieResult';
import LoginForm from './component/LoginForm'
import { useApolloClient,gql,useQuery, useLazyQuery} from '@apollo/client';
import Register from './component/Register';
import FavouriteMovie from './component/FavouriteMovie';
import Home from './component/Home'

const GET_CURRENT_USER = gql`
query{
  me{
    username
    id
    favouriteMovies
  }
}
`

const App = (props)=>{
  const history = useHistory()
  const [,setToken] = useState(null)
  const [user,setUser] = useState(null)

  const result = useQuery(GET_CURRENT_USER,{onCompleted:()=>{
    setUser(result.data.me)
  }})
 

  const client = useApolloClient()


  const logout = ()=>{
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      <div className="top-nav-bar">
            <Link className="top-nav-button" style={{color:'darkblue',fontWeight:'bold'}} to = "/">Another Movie Database (AMDB)</Link>
            <div className="flex-container">
            {user === null ? <Link className="top-nav-button" to = "/login">Login</Link> : <p style={{color:'black'}}>{user.username}</p>}
            {user && <button className="top-nav-button" onClick={logout}>logout</button>}
            </div>
      </div>
 
      <div className="sidebar-displaycomponent-container">
      <div >
          <div className="side-nav-menu">
          <Link className="nav-menu-item-circle" to="/search">Search</Link>
          <Link className="nav-menu-item-circle" to="/popular/page=1">Popular</Link>
          <Link className="nav-menu-item-circle" to="/trending/page=1">Trending</Link>
          <Link className="nav-menu-item-circle" to="/favourite">Favourite</Link>
        </div>
      </div>
     

      <Switch>
        <div className="displayComponent">
        <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/search" >
            <SearchField/>
         </Route>
         <Route exact path="/popular/page=:pageNumber">
            <MovieList mode="popular"/>
         </Route>
         <Route exact path="/trending/page=:pageNumber">
            <MovieList mode="trending"/>
         </Route>
         <Route exact  path="/movie/:id"  >
           <MovieDetail user={user} />
         </Route>
         <Route exact path="/search/k=:keyword&page=:pageNumber">
           <SearchMovieResult/>
         </Route>
         <Route exact path="/login" render={()=>
            user ? <Redirect to="/"/> :<LoginForm setToken={setToken} setUser={setUser}/>
         }/>
          <Route exact path="/register" >
            <Register/>
         </Route>
         <Route exact path ="/favourite">
            <FavouriteMovie user={user}/>
         </Route>
         
        </div>
       
      </Switch>
      </div>
    </Router>
  )
}

export default App;
