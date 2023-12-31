import React, { useState, useEffect } from 'react';
import FoodCard from '../../components/FoodCard';

 const DisplayFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
        const url = "http://localhost:4000/api/hawa/displayFood";
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
          setFoods(data)
        }
    }      
    fetchFoods();
  }, []);

  
  const handleDelete=async(_id)=>{
    const url=`http://localhost:4000/api/hawa/deleteFood/${_id}`;
    const response=await fetch(url,{
        method:'DELETE'
    })
    if(response.ok){
      setFoods(prevFoods=>prevFoods.filter(food=>food._id!==_id))
    }
  }
  return (
    <div className="container">
    <div className="row">
      {foods.map((food) => (
        <div className="col-md-4" key={food._id}>
          <FoodCard food={food} handleDelete={()=>{handleDelete(food._id)}} />
        </div>
      ))}
    </div>
  </div>
   
  )
}

export default DisplayFood
