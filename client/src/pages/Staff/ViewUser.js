import React,{useState,useEffect} from 'react'


const ViewUser = () => {
 
    const [user,setUser]=useState([]);

    useEffect(()=>{
        const fetchUser=async()=>{
            const url="http://localhost:4000/api/hawa/displayAllUser";
            const response=await fetch(url);
            const json=await response.json();
            if(response.ok){
                setUser(json);
            }
        }
        fetchUser();
    })

  return (
    <div className="container">
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                
                </tr>
            </thead>
            <tbody>
                {user && user.map((info)=>(
                    <tr key={info._id}>
                        <td>{info.username}</td>
                        <td>{info.email}</td>
                        <td>{info.role}</td> 
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default ViewUser;

