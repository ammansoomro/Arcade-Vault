import React from "react";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
      <div className="app-content">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default App;
