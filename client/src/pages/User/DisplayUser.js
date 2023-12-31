import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const DisplayUser = () => {
    const navigate=useNavigate();
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

    const handleDelete=async(id)=>{
        
        const url=`http://localhost:4000/api/hawa/deleteUser/${id}`;
        const response=await fetch(url,{
            method:'DELETE'
        })
        if(response.ok){
            setUser(prevUser=>prevUser.filter(user=>user._id!==id));
        }
    }

    const handleUpdate=async(id)=>{
        navigate(`/updateUser/${id}`);

    }
  return (
    <div className="container">
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {user && user.map((info)=>(
                    <tr key={info._id}>
                        <td>{info.username}</td>
                        <td>{info.email}</td>
                        <td>{info.role}</td>
                        <td><button className="btn btn-danger mx-2" onClick={()=>{handleDelete(info._id)}}>Delete</button>
                        <button className="btn btn-primary" onClick={()=>{handleUpdate(info._id)}}>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default DisplayUser;

