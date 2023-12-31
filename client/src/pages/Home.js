import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import DisplayStar from './Reviews/DisplayStar';
import './Home.css';

const Home = () => {
  const { authenticated, setAuthenticated, role, userId, username } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [foods, setFoods] = useState([]);
  const [ratingInfo, setRatingInfo] = useState([]);
  const [cartInfo, setCartInfo] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      const url = "http://localhost:4000/api/hawa/displayFood";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setFoods(data);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      const url = "http://localhost:4000/api/hawa/displayReview";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRatingInfo(data);
      }
    };
    fetchReview();
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      const url = "http://localhost:4000/api/hawa/displayAllCart";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setCartInfo(data);
      }
    };
    fetchFood();
  }, []);

  const handleCart = async (food) => {
    const foodId = food._id;
    const name = food.name;
    const description = food.description;
    const price = food.price;
    const quantity = "1";
    const status = "preparation";
    const userName= username;

    // Check if the food is already in the cart
    const isFoodInCart = cartInfo.some((item) => item.foodId === foodId && item.userId===userId) ;

    if (isFoodInCart) {
      // Display a message for the specific item
      window.alert("Food already exists in the cart");
      navigate('/displayCart');
      return;
    }

    dispatch(addToCart({ foodId, name, price }));

    const cartItem = { name, description, price, quantity, userId, foodId, userName, status };
    try {
      const url = "http://localhost:4000/api/hawa/addCart";
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(cartItem),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        window.alert("Order Placed");
        navigate('/displayCart');
        setAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }

    const niki = { name, price };
    const notificationUrl = `http://localhost:4000/api/hawa/addNoti`;
    try {
      const response = await fetch(notificationUrl, {
        method: 'POST',
        body: JSON.stringify(niki),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    window.alert("Please login to place an order");
    navigate('/login')
  };

  const handleView = (id) => {
    navigate(`/foodDetails/${id}`);
  };

  return (
    <>
    <div id='back'>
    <div className="container">
        <div className="row">
          <h1>Today's Menu</h1>
          {foods.map((food) => {
            const foodRatings = ratingInfo.filter((info) => info.foodId === food._id);
            const totalRating = foodRatings.reduce((sum, info) => sum + info.rating, 0);
            const averageRating = foodRatings.length > 0 ? totalRating / foodRatings.length : 0;

            return (
              <div className="col-md-4" key={food._id}>
                <div className='card my-2' id='cardInfo'>
                  <img src={`http://localhost:4000/ItemImage/${food.filename}`} width="413px" height="300px" alt="" />
                  <h3>Item Name: {food.name}</h3>
                  <p className='mx-2'>Food Description: {food.description}</p>
                  <b className='mx-2'>Price: Rs {food.price}</b>
                  <p className='mx-2'>Estimated time: {food.time}</p>
                  <p className='mx-2 text-success'>Status: {food.status}</p>
                  {/* Display the average rating */}
                  <DisplayStar star={averageRating} />
                  <p className='mx-5'>Reviews: {foodRatings.length}</p>
                  <div style={{ display: 'flex' }}>
                    <button className="btn btn-primary" style={{ width: '150px' }} onClick={() => { handleView(food._id) }}>View Item</button>
                    {authenticated ? (
                      role !== 'admin' && role !== 'staff' && food.status !== 'unavailable' && role === 'customer' ? (
                        <button className="btn btn-success mx-2" style={{ width: '150px' }} onClick={() => { handleCart(food) }}>Place Order</button>
                      ) : null
                    ) : (
                      <button className="btn btn-success mx-2" onClick={handleClick}>Place Order</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {error && <div>{error}</div>}
      </div>

    </div>
    </>
  );
};

export default Home;
