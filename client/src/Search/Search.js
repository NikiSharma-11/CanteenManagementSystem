import React from 'react'

const Search = ({searchResult}) => {
  return (
    <div className="container">
      <div className="row">
          {searchResult && searchResult.map((food) => (
            <div className="col-md-4" key={food._id}>
              <div className='card'>
              <img src={`http://localhost:4000/ItemImage/${food.filename}`} width="400px" height="300px" alt="" />
                <h1>{food.name}</h1>
                <h1>{food.description}</h1>
                <h1>{food.price}</h1>
                </div>
            </div>
          ))}
        </div>
      </div>
  )
}
export default Search;
