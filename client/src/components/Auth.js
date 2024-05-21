import {useState} from 'react'
import {useCookies} from 'react-cookie'
const Auth = () => {
    const [cookies,setCookies,removeCookies]=useCookies(null)
    const [error,setError]=useState(null)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [confirmPassword,setconfirmPassword]=useState(null)
    const [isLogin,setLogin] = useState(true)

    console.log(email,password,confirmPassword)

    const viewLogin=(status)=>{
        setError(null)
        setLogin(status)
    }

    const handleSubmit=async(e,endpoint)=>{
        e.preventDefault();
        if(!isLogin && password!==confirmPassword){
            setError('Make sure that password matches')
            return
        }

        const response=await fetch(`http://localhost:5000/${endpoint}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const data=await response.json()
       
        if(data.detail){
            setError(data.detail)
        }else{
            setCookies('Email',data.email)
            setCookies('AuthToken',data.token)
            window.location.reload()
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLogin ? 'please log in':'please sign up'}</h2>
                    <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                    {!isLogin && <input type='password' placeholder='confirm password' onChange={(e)=>setconfirmPassword(e.target.value)}/>}
                    <input type='submit' className="create" onClick={(e)=>{handleSubmit(e,isLogin?'login':'signup')}}/>
                    {error && <p>{error}</p>}
                </form>
                <div className='auth-options'>
                    <button 
                        onClick={()=>viewLogin(false)}
                        style={{backgroundColor:!isLogin?'rgb(255,255,255)':'rgb(188,188,188)'}}
                    >Sign Up</button>
                    <button 
                        onClick={()=>viewLogin(true)}
                        style={{backgroundColor:isLogin?'rgb(255,255,255)':'rgb(188,188,188)'}}
                    >LogIn</button>

                </div>
            </div>
        </div>
    )
}
 
export default Auth