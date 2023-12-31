import React,{useState, useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

 const Login = () => {
    const {setAuthenticated}=useContext(AuthContext);
    const navigate=useNavigate();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const userData={email,password};
        const response=await fetch('http://localhost:4000/api/hawa/logIn',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json();
        if(!response.ok){
            setError(json.msg)
        }else{
            localStorage.setItem('token',json.accessToken);
            setEmail('');
            setPassword('');
            window.alert("login successful");
            setAuthenticated(true);
            navigate('/');
        }
    }
  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="card" style={{width:'400px', border:'1px solid gray'}}>
                <h1>Login form</h1>
                    <div className="d-flex justify-content-center">
                    
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input type="text" className='form-control' onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br />
                <label>Password</label><br />
                <input type="password" className='form-control' onChange={(e)=>{setPassword(e.target.value)}} value={password}/><br />
                <button className="btn btn-primary my-3">Login</button>
            </form>
                    </div>
                    <div className="d-flex justify-content-center">
                    {error && <div className='text-danger'>{error}</div>}
                    </div>
                </div>
            </div>


        </div>
    </>
  )
}
export default Login
