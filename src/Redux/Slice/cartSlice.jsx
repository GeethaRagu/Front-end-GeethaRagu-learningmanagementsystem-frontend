import { createSlice } from "@reduxjs/toolkit";

//const data = JSON.parse(localStorage.getItem('cart'));

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      //console.log(item);
      state.cartItems.push(item);
      state.totalItems++;
      state.total += parseInt(item.courseprice);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    removeFromCart: (state, action) => {
      const {item} = action.payload;
      //console.log(item);
      const id = item._id;
      //console.log(id);
      const price = parseInt(item.courseprice);
      
      const removeItem = state.cartItems.filter((item) => item._id !== id);
      state.cartItems = removeItem;
      state.totalItems--;
      // const total1 = parseInt(state.total) - parseInt(price);
      // state.total = total1;
      const total1 = state.total;
      //console.log(total1,price);
      const total2 = total1 - price;
      //console.log(total2);
      state.total = total2;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
