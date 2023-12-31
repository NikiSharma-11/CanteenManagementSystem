import React,{useContext} from 'react'
import { NavLink,Outlet,useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { AiFillHome } from "react-icons/ai";


const AdminNav = () => {
  const{setAuthenticated}=useContext(AuthContext);
  const navigate=useNavigate();
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
    <>
    <div className="nav">
    <div className="container">
    <div className="row">
        <div className="col-md-6" id="logo">
           <h1> NCCFood </h1>
        </div>
        <div className="col-md-6">
            <ul id="list">
                <li><NavLink to="/"><AiFillHome/></NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                 <li><NavLink to="/adminDash">Dashboard</NavLink></li>
                 <button className="btn btn-dark mx-2" onClick={handleLogout}>Logout</button>
            </ul>

            
        </div>
    </div>
  </div>
  </div>
  <main>
    <Outlet />
  </main>
  </>
  )
}

export default AdminNav