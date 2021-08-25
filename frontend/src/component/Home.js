import React from 'react'

const Home = ()=>{
    return <div>
        <h1>AMDB</h1>
        <p>
            AMDB is a full-stack react web app that allows visitor to search/check out 
            popular/trending movies and logged in users to add movies into their
            favourite list. It also recommends similar movies to users based on selected movie.
        </p>
        <h3> Tech Stack</h3>
        <ul>
            <li>react (hooks)</li>
            <li>graphql</li>
            <li>apollo server & client</li>
            <li>postgres client pg</li>
        </ul>

        <h3>Helpful libs</h3>
        <ul>
            <li>axios</li>
            <li>bcrypt</li>
            <li>jsonwebtoken</li>
            <li>react-router-dom</li>
        </ul>

        <h3>Concept applied</h3>
        <ul>
            <li>Database administration</li>
            <li>User administration</li>
            <li>render movie cast & recommended movies dynamically</li>
            <li>Asynchronous ops with both async & await and promise & reject</li>
            <li>render different components conditionally</li>
            <li>pagination (inspired by google search)</li>
            <li>Error-handling</li>
        </ul>

        <h3>Styling</h3>
        <ul>
            <li>mobile-optimised</li>
            <li>flexbox</li>
            <li>sticky-positioned nav bar</li>
            <li>weird colour scheme</li>
        </ul>
        
        <h3>Data source & credits</h3>
        <ul>
            <li>movies and casts data from TMDB api</li>
            <li>heart and back icons from flaticon.com</li>
        </ul>
        
        <a href="https://github.com/black-ros3/movie_site">github</a>
    </div>
}

export default Home