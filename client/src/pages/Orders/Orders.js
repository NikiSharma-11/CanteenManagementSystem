import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

 const Orders = () => {
  const navigate=useNavigate();
    const[info, setInfo]=useState([]);
    useEffect(() => {
        const fetchCart = async () => {
          const url = "http://localhost:4000/api/hawa/displayAllCart";
          const response = await fetch(url);
          const data = await response.json();
          if (response.ok) {
            setInfo(data);
            
          }
        };
        fetchCart();
      });

      const handleUpdate=(id)=>{
        navigate(`/updateOrder/${id}`);


      }

  return (
    <>
    <div className="container">
      <table className="table">
        <thead>
          <tr>
           <th scope="col">Customer Name</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
            
          </tr>
        </thead>
        <tbody>
          {info &&
            info.map((cart) =>
              (
                <tr key={cart._id}>
                  <td>{cart.userName}</td>
                  <td>{cart.name}</td>
                  <td>{cart.price}</td>
                  <td>{cart.quantity}</td>
                  <td>{cart.status}</td>
                  {
                    cart.status==="ready" ? (
                      <td>Ready</td>
                    ):(
                      <td><button className="btn btn-primary" onClick={()=>{handleUpdate(cart._id)}}>Update Status</button></td>
                    )

                  }
                </tr>
                
              ) 
            )}
        </tbody>
      </table>
    </div>
    </>
  )
}

 export default Orders;