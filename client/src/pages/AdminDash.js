import React, {useState} from 'react'
import './AdminDash.css';
import AddFood from './AddFood';
import DisplayFood from './Item/DisplayFood';
import DisplayUser from './User/DisplayUser';
import Orders from './Orders/Orders';




 const AdminDash = () => {
    const[categoryData, setCategoryData]=useState('');

    const handleClick=(category)=>{
        setCategoryData(category);

    }
  return (
    <>
    <div className="container-fluid" id='main'>
        <div className="row">
            <div className="col-md-2 align-item-center" id='admin-sidebar'>
            <button className="w-100" id='admin-button' onClick={(()=>handleClick('addFood'))}>Add Food</button><br/>
            <button className="w-100 " id='admin-button' onClick={(()=>handleClick('displayFood'))}>Display Food</button><br/>
            <button className="w-100 " id='admin-button' onClick={(()=>handleClick('displayUser'))}>User</button> <br/>
            <button className="w-100" id='admin-button' onClick={(()=>handleClick('orders'))}>Orders</button>
            </div>
            <div className="col-md-10">
                {categoryData==='addFood' && <AddFood/> }
                {categoryData==='displayFood' && <DisplayFood/> }
                {categoryData==='displayUser' && <DisplayUser/> }
                {categoryData==='orders' && <Orders/> }
            </div>
            
        </div>

    </div>
    </>
  )
}

export default AdminDash;
