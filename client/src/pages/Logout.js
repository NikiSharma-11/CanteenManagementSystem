import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Logout = () => {
  const navigate=useNavigate()
  const {setAuthenticated}=useContext(AuthContext);

    const handleLogout=()=>{
      const confirmed=window.confirm("Are you sure you want to logout?")
        if(confirmed){
        localStorage.removeItem('token');
        console.log("Logout Successfull");
        setAuthenticated(false);
        navigate('/');
        }
    }
  return (
   <div className="container">
    <div className='d-flex justify-content-center my-2'>
    <h2>Logout</h2>
        <button className='btn btn-danger mx-2' style={{width:'100px'}} onClick={handleLogout}>Logout</button>

    </div>
   </div>
  )
}
 export default Logout;
