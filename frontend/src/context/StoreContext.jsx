import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import customConstants from "../utilities/customConstants";
export const storeContext = createContext(null);
const StoreContextProvider = ({ children }) => {
  const [item_list, setItems] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const fetchItems = async () => {
    const response = await axios.get(customConstants.API_LIST_ITEMS);
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Error Fetching Data");
    }
  };

  const fetchCartData = async (userToken) => {
    const response = await axios.get(customConstants.API_GET_CART, {
      headers: { token: userToken },
    });
    if (response.data.success) {
      return response.data.cartData;
    } else {
      toast.error("Error Fetching Data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem("token");
      const itemsData = await fetchItems();
      if (itemsData) {
        setItems(itemsData);
      }
      if (userToken) {
        setToken(userToken);
        const cartData = await fetchCartData(userToken);
        setCartItems(cartData);
      } else {
        setCartItems({});
      }
    };
    fetchData();
  }, [token]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        customConstants.API_ADD_TO_CART,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      await axios.post(
        customConstants.API_REMOVE_FROM_CART,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = item_list.find((item) => item._id === itemId);
        total += item.price * cartItems[itemId];
      }
    }

    return total;
  };

  const contextValue = {
    item_list,
    cartItems,
    token,
    setToken,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
