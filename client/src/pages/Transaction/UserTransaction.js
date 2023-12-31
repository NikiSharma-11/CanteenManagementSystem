import React,{useState,useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthContext';


const UserTransaction = () => {
    const { userId, setAuthenticated } = useContext(AuthContext);
    const [user,setUser]=useState([]);

    useEffect(()=>{
        const fetchUser=async()=>{
            const url="http://localhost:4000/api/hawa/displayPayment";
            const response=await fetch(url);
            const json=await response.json();
            if(response.ok){
                setAuthenticated(true);
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
                <th scope="col">productName</th>
                <th scope="col">status</th>
                
                </tr>
            </thead>
            <tbody>
                {user && user.map((info)=>info.userId===userId?(
                    <tr key={info._id}>
                        <td>{info.productName}</td>
                        <td>{info.status}</td> 
                    </tr>
                ):(null))}
            </tbody>
        </table>
    </div>
  )
}
export default UserTransaction;


