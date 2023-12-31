import React,{useContext, useEffect, useState} from 'react'
import AuthContext from '../../context/AuthContext';

 const UserNotification = () => {
    const{setAuthenticated,userId}=useContext(AuthContext);
  const[notification,setNotification]=useState([]);
  useEffect(()=>{
    const fetchNotification=async()=>{
      const url="http://localhost:4000/api/hawa/displayUserNoti";
      const response=await fetch(url);
      const json=await response.json();
      if(response.ok){
        setNotification(json);
        setAuthenticated(true);
      }
    }
    fetchNotification();
  })
  return (
    <div className="container">
      {notification && notification.map((info)=>info.userId===userId?(
        <div key={info._id}>
          <h1>Your Food is {info.status}</h1>
        </div>
      ):(null))}
    </div>
  )
}
export default UserNotification;