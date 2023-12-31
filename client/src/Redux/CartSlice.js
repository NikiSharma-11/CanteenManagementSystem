import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            state.cart.push(action.payload)
        },
        removeCart:(state,action)=>{
            const removedFoodId = action.payload;
            const removedItem = state.cart.find(item => item.foodId === removedFoodId);
            if (removedItem) {
              // Decrease the count based on the item's quantity
              state.cart = state.cart.filter(item => item.foodId !== removedFoodId);
            }
        }
    }
})
export default cartSlice.reducer;
export const {addToCart,removeCart}=cartSlice.actions