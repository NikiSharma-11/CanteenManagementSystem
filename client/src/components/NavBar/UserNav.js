import React,{useState,useContext} from 'react'
import { NavLink, Outlet,useLocation,useNavigate } from 'react-router-dom';
import Search from '../../Search/Search';
import { useSelector } from 'react-redux';
import AuthContext from '../../context/AuthContext';
import { AiFillHome,AiOutlineShoppingCart,AiOutlineSearch } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";


const UserNav = () => {
  const{setAuthenticated}=useContext(AuthContext);
  const cartItem=useSelector(state=>state.cart.cart);
const navigate=useNavigate();
  const location=useLocation();
  const [searchItem,setSearchItem]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const name={searchItem};
    const url='http://localhost:4000/api/hawa/search';
    const response=await fetch(url,{

      method:'POST',
      body:JSON.stringify(name),
      headers:{
        'Content-Type':'application/json'
      }

    });

    const json= await response.json();
    if(response.ok){
      setSearchResult(json);
      console.log(json);
      navigate('/searchFood');

    }

  }

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
        <div className="col-md-2" id="logo">
           <h1> NCCFood </h1>
        </div>
        <div className="col-md-10">
            <ul id="list">
                <li><NavLink to="/" ><AiFillHome/></NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/displayCart"><AiOutlineShoppingCart/>{cartItem.length}</NavLink></li>  
                <li><NavLink to="/userNotification"><IoIosNotifications/></NavLink></li> 
                <li><NavLink to="/userTransaction">Purchase History</NavLink></li>
                
                <li>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex">
                    <input type="text" className='form-control' placeholder='search'
                    onChange={(e)=>setSearchItem(e.target.value)} value={searchItem}/>
                    <button className="btn btn-primary " ><AiOutlineSearch/></button>
                    </div>
          
                  </form>
                  </li>
                  <button className="btn btn-dark mx-2" onClick={handleLogout}>Logout</button>
            </ul>
        </div>
    </div>
  </div>
  </div>
  <main>
    <Outlet />
    {location.pathname === '/searchFood' && <Search searchResult={searchResult} />}
  </main>
  </>
  )
}
 export default UserNav