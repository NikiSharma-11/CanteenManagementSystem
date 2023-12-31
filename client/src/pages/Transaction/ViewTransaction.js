import React,{useState,useEffect} from 'react'


const ViewTransaction = () => {
 
    const [user,setUser]=useState([]);

    useEffect(()=>{
        const fetchUser=async()=>{
            const url="http://localhost:4000/api/hawa/displayPayment";
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
                <th scope="col">ProductName</th>
                <th scope="col">Payment Status</th>
                
                </tr>
            </thead>
            <tbody>
                {user && user.map((info)=>(
                    <tr key={info._id}>
                        <td>{info.username}</td>
                        <td>{info.productName}</td>
                        <td>{info.status}</td> 
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default ViewTransaction;


