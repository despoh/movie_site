import React,{useState,useEffect} from 'react'
import {gql,useMutation} from '@apollo/client'
import {useHistory,Link} from 'react-router-dom'

const LOGIN = gql`
mutation login($username:String!,$password:String!){
    login(username:$username,password:$password){
        value
    }
}
`

const LoginForm = ({setToken,setUser})=>{
    const history = useHistory()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const [login,result] = useMutation(LOGIN,{
        onError: (error)=>{
            setError(`Error: ${error.message}`)
            setTimeout(()=>{
                setError(null)
            },5000)
        }
    })

    useEffect(()=>{
            if(result.data){
                const token = result.data.login.value
                setToken(token)
                localStorage.setItem('user-token',token)
                history.push('/')
                history.go(0)
            }
               
    },[result.data])

    const submitForm = (event)=>{
        event.preventDefault()
        login({variables:{username,password}})
    }

    return <div>
        <h1>Login</h1>
        <form onSubmit={submitForm}>
            <div>
                <div>
                <h3>Username</h3> 
                <input value={username} 
                    onChange = {({target})=>setUsername(target.value)}
                />
                </div>
                <div>
                <h3>Password</h3>
                <input value={password}  type='password'
                    onChange = {({target})=>setPassword(target.value)}
                />
                </div>
                <p>Need an account? Click <Link to="/register">Here</Link></p>
               <button type="submit">login</button>
            </div>
        </form>
        {error && <div className="error-message">{error}</div>}
    </div>
}

export default LoginForm