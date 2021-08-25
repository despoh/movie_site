const {gql} = require('apollo-server')

const userType = gql `
    type User{
        id:ID!
        username:String!
        password:String!
        favouriteMovies : [Int!]
    }

    type Token {
        value:String!
    }

    type Data{
        isAppend:Boolean!
        favouriteMovies: [Int!]
    }

    extend type Query{
        me : User
        getUser(username:String!): User
    }

    type Mutation{
        createUser(username:String!,password:String!):User
        login(username:String!,password:String!):Token 
        updateFavouriteMovies(tmdbId:Int!):Data
    }
`

module.exports = userType