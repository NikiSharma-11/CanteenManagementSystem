import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import Star from '../Reviews/Star';
import AuthContext from '../../context/AuthContext';
 const FoodDetails = () => {
  const{username}=useContext(AuthContext);
    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState('');
    const[image,setImage]=useState('');
    const[rating,setRating]=useState(0);
    const[error,setError]=useState('');
    const[comment,setComment]=useState('');
    const[fId,setFId]=useState('');
    const[ratingData,setRatingData]=useState('');
    const{id}=useParams();
    const foodId=id;

    useEffect(() => {
        const fetchFood = async () => {
            const url = `http://localhost:4000/api/hawa/displayFood/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok){
              setFId(data._id);
              setName(data.name);
              setPrice(data.price);
              setDescription(data.description);
              setImage(data.filename);
            }
        }      
        fetchFood();
      }, [id]);
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const userData= {foodId,rating,comment,username};
        const  url= 'http://localhost:4000/api/hawa/addReview';
        const response= await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const json= await response.json();

        if(!response.ok){
            setError(json.error);
        }
        else{
            setRating(0);
            setComment('');
        }
      }
      useEffect(()=>{
        const fetchRating=async()=>{
          const url="http://localhost:4000/api/hawa/displayReview";
          const response=await fetch(url);
          const data=await response.json();
          if(response.ok){
            setRatingData(data);
          }
        }
        fetchRating();
      })
      
  return (
    <div className="container">
   <div className="row">
    <div className="flex">
   <img src={`http://localhost:4000/ItemImage/${image}`} width="500px" height="400px" alt="" />
   </div>
    <div className="col-md-4">
    <h3>Item name: {name}</h3>
      <p>Description: {description}</p>
      <strong>Price: Rs{price}</strong>
        <form onSubmit={handleSubmit}>
            <p>Rating:</p><br/>
            <Star stars={rating} onStarClick={setRating} /><br/>
            <textarea placeholder="Review" value={comment} onChange={(e) => setComment(e.target.value)}/><br/>
            <button className="btn btn-primary">Submit Review</button>
        </form>
        {error && <div>{error}</div>}
        <h2>Comments</h2>
        {ratingData && ratingData.map((info)=>info.foodId===fId?(
          <div  key={info._id}>
            <b className='mx-2'>{info.username}</b>
            <b>{info.comment}</b>
          </div>
        ):null)}
    </div>
   </div>   
    </div>
  )
}
export default FoodDetails;