import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

// import { food_list } from "../../src/assets/assets";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const url = "http://localhost:4000"
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([])

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", {itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", {itemId},{headers:{token}})
    }
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItem) {
  //     if (cartItem[item] > 0) {
  //       let itemInfo = food_list.find((product) => product.id === item);
  //       totalAmount += itemInfo.price * cartItem[item];
  //     } // only consider items with positive quantity in the cart
  //   }
  //   return totalAmount;
  // }
  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    for (const itemId in cartItem) {
      if (cartItem[itemId] > 0) {
        const itemInfo = food_list.find((product) => {
          return product.id?.toString() === itemId.toString();
        });
  
        if (itemInfo && itemInfo.price) {
          totalAmount += itemInfo.price * cartItem[itemId];
        }
      }
    }
  
    return totalAmount;
  };
  
  

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    const foodData = response.data.data.map((item) => ({
      ...item,
      id: item._id.toString(), // Thêm id chuẩn để so sánh
    }));
    setFoodList(foodData);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItem(response.data.cartData);
  }
  

  useEffect(() =>{
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
      
  },[])

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
