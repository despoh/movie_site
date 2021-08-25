import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import {useHistory,Link} from 'react-router-dom'

const GET_USER = gql`
query getUser($username:String!){
    getUser(username:$username){
        username
    }
}
`

const REGISTER = gql`
mutation createUser($username:String!,$password:String!){
    createUser(username:$username,password:$password){
        username
    }
}
`

const Register = ()=>{
    const history = useHistory()

    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [password2,setPassword2] = useState(null)
    const [usernameValidityMsg, setUsernameValidityMsg] = useState(null)
    const [passwordValidityMsg, setPasswordValidityMsg] = useState(null)
    const [password2ValidityMsg, setPassword2ValidityMsg] = useState(null)
    const [passwordMatch,setPasswordMatch] = useState(null)
    const [validUsername,setValidUsername] = useState(null)
    const [requirementFulfilled, setRequirementFullfilled] = useState(false)
    const [sucessRegistration,setSucessRegistration] = useState(null)

    const [getUser,queryResult] = useLazyQuery(GET_USER,{
        onError:()=>{
            console.log('error occured')
        },
        onCompleted:()=>{
            if(queryResult.data.getUser === null){
                setUsernameValidityMsg('✅')
                setValidUsername(true)
            }else{
                setUsernameValidityMsg('username already exist')
                setValidUsername(false)
            }

        }
    })


    const [register,mutationResult] = useMutation(REGISTER,{
        onError:(error)=>{
            console.log(`error occured: ${error}`)
        },
        onCompleted:()=>{
            setSucessRegistration(true)
            setTimeout(()=>{
                history.push('/login')
            },3000)
        }
})


    const submitForm = (e)=>{
        e.preventDefault()
        register({variables:{username,password}})
    }

    useEffect(()=>{
        

        if(passwordMatch){
            setPassword2ValidityMsg('✅')
        }else{
            if(password2){
                setPassword2ValidityMsg('Not matched')
            }
        }

        if(validUsername && password && passwordMatch){
            setRequirementFullfilled(true)
        }else{
            setRequirementFullfilled(false)

        }

    },[passwordMatch,validUsername,password])

    const onUsernameChange = ({target})=>{

        if(target.value === ""){
            setUsernameValidityMsg("Username can't be empty")
            setUsername(null)

        }else if(target.value.length < 6){
            setUsernameValidityMsg("minimum 6 character")
            setUsername(null)
        }else{
            getUser({variables:{username:target.value}})
            setUsername(target.value)
        }


    }
    
    const onPasswordChange = ({target})=>{

        if(target.value.length < 8){
            setPasswordValidityMsg('minimum password length :8 ')
            setPassword(null)
        }else{
            setPasswordValidityMsg('✅')

            setPassword(target.value)

            target.value !== password2 ? setPasswordMatch(false) : setPasswordMatch(true) 


        }

      
    }

    const onPassword2Change = ({target})=>{
        
        setPassword2(target.value)

        target.value !== password ? setPasswordMatch(false) : setPasswordMatch(true)
    
    }

    if(sucessRegistration){
        return <div>Sucess Registration Redirecting to login page</div>
    }


    return <div>
        <h1>Create account</h1>
        <form onSubmit={submitForm}>
            <div>
                <h3>Username</h3>
                <input onChange={onUsernameChange}></input>
                {usernameValidityMsg && <div>{usernameValidityMsg}</div>}
            </div>
            <div>
                <h3>Password</h3>
                <input type="password" onChange={onPasswordChange 
                    }></input>
                    {passwordValidityMsg && <div>{passwordValidityMsg}</div>}
            </div>
            <div>
                <h3>Confirm Password</h3>
                <input type="password" onChange={onPassword2Change
                }></input>
                {password2ValidityMsg && <div>{password2ValidityMsg}</div>}
            </div>
                {requirementFulfilled ? <button type="submit">Register</button> 
 :<p>register button will appear when all requirements are fulfilled</p>
}
        </form>

    </div>
}

export default Register