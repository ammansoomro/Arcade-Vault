import { createContext } from "react";
import { item_list } from "../assets/assets";

export const storeContext = createContext(null);

const storeContextProvider = (props) => {
  const contextValue = {
    item_list,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default storeContextProvider;
