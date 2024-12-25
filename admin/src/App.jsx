import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem/AddItem";
import ListItems from "./pages/ListItems/ListItems";
import ListOrders from "./pages/ListOrders/ListOrders";
import ListCategories from "./pages/ListCategories/ListCategories";
import AddCategory from "./pages/AddCategory/AddCategory";
const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/listItems" element={<ListItems />} />
          <Route path="/listOrders" element={<ListOrders />} />
          <Route path="/listCategories" element={<ListCategories />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
