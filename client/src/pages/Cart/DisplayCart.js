import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {removeCart} from '../../Redux/CartSlice'
const DisplayCart = () => {
  const dispatch=useDispatch();
  
  const navigate=useNavigate();
  const [myCartData, setMyCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { userId, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      const url = "http://localhost:4000/api/hawa/displayAllCart";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setMyCartData(data);
        setAuthenticated(true);
        // Initialize quantities object with default values
        const initialQuantities = data.reduce((obj, cart) => {
          obj[cart._id] = 1;
          return obj;
        }, {});
        setQuantities(initialQuantities);
      }
    };
    fetchCart();
  }, [setAuthenticated]);

  const handleUpdateQuantity = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  //Delete a cart item
  const hanldeDelete=async(id)=>{
    const removedItem = myCartData.find(cart => cart._id === id);
    if (removedItem) {
      dispatch(removeCart(removedItem.foodId)); // Pass the foodId to the removeCart action
    }
    const url=`http://localhost:4000/api/hawa/deleteCart/${id}`;
    const response =await fetch(url,{
      method:'DELETE'
    })
    if(response.ok){
      setMyCartData(prevCart=>prevCart.filter(cart=>cart._id!==id))
    }
  }
  
  const handlePurchase = async() => {
    const selectedItems = myCartData
    .filter((cart) => cart.userId === userId)
    .map((cart) => ({
      id: cart._id,
      quantity: quantities[cart._id] || 1,
    }));

  // Create an array of selected cart IDs
  const selectedCartIds = selectedItems.map((item) => item.id);

  // Construct the itemIds string by joining the selected cart IDs with commas
  const itemIds = selectedCartIds.join(',');

  const updateRequests = selectedItems.map(async (item) => {
    const url = `http://localhost:4000/api/hawa/updateCart/${item.id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ quantities: item.quantity }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const json = await response.json();
      console.log(json.errors);
      // Handle the error as needed
    }
  });

  // Wait for all update requests to complete
  await Promise.all(updateRequests);

  // Now you can navigate to the payment page with the itemIds in the URL params
  navigate(`/paymentPage/${itemIds}`);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    myCartData.forEach((cart) => {
      if (cart.userId === userId) {
        total += cart.price * (quantities[cart._id] || 1);
      }
    });
    return total;
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove Cart</th>
         
          </tr>
        </thead>
        <tbody>
          {myCartData &&
            myCartData.map((cart) =>
              cart.userId === userId ? (
                <tr key={cart._id}>
                  <td>{cart.name}</td>
                  <td>{cart.price}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() =>handleUpdateQuantity(cart._id,Math.max(1, quantities[cart._id] - 1)) }>
                      -
                    </button>
                    <input type="text" value={quantities[cart._id] || 1} onChange={(e) =>handleUpdateQuantity(cart._id,parseInt(e.target.value) || 1)} style={{ width: "30px" }}/>
                    <button className="btn btn-primary"onClick={() =>handleUpdateQuantity(cart._id, quantities[cart._id] + 1)}>
                      +
                    </button>
                  </td>
                  <td><button className="btn btn-danger" onClick={()=>{hanldeDelete(cart._id)}}>Remove Cart</button></td>
                 
                </tr>
              ) : null
            )}
        </tbody>
      </table>
      <h1>Total: Rs: {calculateTotalPrice().toFixed(2)}</h1>
      <button className="btn btn-primary" onClick={handlePurchase}>Checkout</button>
    </div>
  )
}

export default DisplayCart;