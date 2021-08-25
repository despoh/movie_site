const {gql} = require('apollo-server')


const movieType = gql`
    type Movie {
        tmdbID:ID!
        title: String!
        description: String!
        imageUrl : String
        hdImageUrl: String
        releaseDate : String
        budget: Int
        genres : [String]
        original_language: String
        runtime:Int
    }

    type Cast{
        character:String!
        name:String!
        imageUrl:String
    }

    type Result{
        totalPage:Int!
        movies:[Movie!]
    }

    extend type Query{
        getMovie(id: Int!): Movie
        searchMovies(keyword: String!,pageNumber:Int!):Result
        getTrendingMovies(pageNumber:Int!):Result
        getPopularMovies(pageNumber:Int!):Result
        getAllFavouriteMovies(movieIds:[Int]!):[Movie]!
        getRecommendedMovies(id:Int!):[Movie]!
        getCasts(id:Int!):[Cast]!
    }
`

module.exports = movieType