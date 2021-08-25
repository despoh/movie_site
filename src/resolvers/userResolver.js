const bcrypt = require('bcrypt')
const db = require('../dbqueries')
const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../utils')


const userResolver = {
    Query:{
        me:(root,args,context)=>{
            return context.currentUser
        },
        getUser: async (root,args)=>{
            const user = await db.getUser(args.username)
            return user;
        }
    },
    Mutation:{
        createUser : async (root,args)=>{
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password,saltRounds)
            const newUser = await db.saveUser(args.username,passwordHash)
            return newUser
        },
        login: async (root,args)=>{
            const user = await db.getUser(args.username).catch((error)=>{
                throw new Error("Can't get user")
            })

            const passwordMatch = user === undefined ? false : await bcrypt.compare(args.password,user.password)

            if(!(user && passwordMatch)){
                throw new Error("Incorrect user credentials - please try again.")
            }

            const userToken = {
                username: user.username,
                id: user.id
            }
    
            return {value:jwt.sign(userToken,JWT_SECRET)}
        },
        updateFavouriteMovies: async (root,args,context) =>{
            let updatedUser = null
            let data = null
            const movieId = args.tmdbId
            const currentUser = context.currentUser

            if(!currentUser){
                throw new Error("Please log in before your add to favourite")
            }

           
            if(currentUser.favouritemovies !== null && currentUser.favouritemovies.includes(movieId)){
                updatedUser = await db.updateMoviesListForUser(currentUser.username,movieId,'remove')
                data = {
                    isAppend: false,
                    favouriteMovies : updatedUser.favouritemovies
                } 
            }else{
                updatedUser = await db.updateMoviesListForUser(currentUser.username,movieId,'append')
                data = {
                    isAppend: true,
                    favouriteMovies : updatedUser.favouritemovies
                } 
            }
            context.currentUser = updatedUser
            
            return data
        }
       
        
    },
    User:{
        favouriteMovies : (root)=> root.favouritemovies
    }
}

module.exports = userResolver