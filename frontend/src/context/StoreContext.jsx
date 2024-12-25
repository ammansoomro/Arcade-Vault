import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import customConstants from "../utilities/customConstants";
export const storeContext = createContext(null);
const StoreContextProvider = ({ children }) => {
  const [item_list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(customConstants.API_LIST_ITEMS);
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Error Fetching Data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchList();
      if (data) {
        setList(data);
      }
    };
    fetchData();
  }, []);

  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
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
