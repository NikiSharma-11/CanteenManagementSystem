import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const navigate=useNavigate();
  const[username,setUsername]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[error,setError]=useState('');

const handleSubmit=async(e)=>{
  e.preventDefault();
  const userData={username,email,password};
  const response=await fetch('http://localhost:4000/api/hawa/signUp',{
    method:'POST',
    body:JSON.stringify(userData),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const json=await response.json();
  if(!response.ok){
    const {errors}= json;
            if(errors.includes("Email already exists, Please login to continue")){
                setError("Email already exists, Please login to continue")
            }
            else{
                setError(errors.join(', '));
            }
  
  }
  else{
    setUsername('');
    setEmail('');
    setPassword('');
    window.alert("SignUp successful");
    navigate('/logIn')
  }
}
  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
      <div className="card" style={{width:'400px', border:'1px solid gray'}}>
      <div className="d-flex justify-content-center">
      <h1>SignUp form</h1>

      </div>
    <div className="d-flex justify-content-center">
    <form onSubmit={handleSubmit}>
        <label>Username</label><br/>
        <input type="text" className='form-control' onChange={(e)=>{setUsername(e.target.value)}} value={username}/><br/>
        <label>Email</label><br/>
        <input type="text" className='form-control'onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br/>
        <label>Password</label><br/>
        <input type="password" className='form-control'onChange={(e)=>{setPassword(e.target.value)}} value={password}/><br/>
       
        <button className="btn btn-success my-3">Submit</button>
      </form>
    </div>

    </div>
      </div>
     <div className="d-flex justify-content-center">
     {error && <div className='text-danger text-align:center'>{error}</div>}

     </div>
    </div>
    
    </>
  )
}

export default SignUp