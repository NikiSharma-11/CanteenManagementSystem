import React from 'react'
import { useNavigate } from 'react-router-dom';

 const FoodCard = (props) => {
  const navigate=useNavigate();
    const{_id,name,description,price, filename,time,status}=props.food;
    const handleClick=(id)=>{
      navigate(`/updateFood/${id}`);
    }
    const{handleDelete}=props;


  return (
    <div className='container'>
        <div className="card" style={{width: "400px"}}>
        <img src={`http://localhost:4000/ItemImage/${filename}`} width="400px" height="300px" alt="" />
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    <p>{price}</p>
    <p>{time}</p>
    <p>{status}</p>
    <button className='btn btn-danger mx-2' onClick={handleDelete}>Delete</button>
    <button className='btn btn-success' onClick={()=>handleClick(_id)} >Update</button>
  </div>
</div>

    </div>
  
  )
}
export default FoodCard;