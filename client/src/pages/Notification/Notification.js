import React,{useEffect, useState} from 'react'

 const Notification = () => {
  const[notification,setNotification]=useState([]);
  useEffect(()=>{
    const fetchNotification=async()=>{
      const url="http://localhost:4000/api/hawa/displayNoti";
      const response=await fetch(url);
      const json=await response.json();
      if(response.ok){
        setNotification(json);
      }
    }
    fetchNotification();
  })
  return (
    <div className="container">
      {notification && notification.map((info)=>(
        <div key={info._id}>
          <h1>Order has been placed for {info.name}</h1>
        </div>
      ))}
    </div>
  )
}
export default Notification;