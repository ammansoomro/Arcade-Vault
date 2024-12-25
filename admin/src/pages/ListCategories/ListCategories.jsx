import React from "react";
import "./ListCategories.css";
import axios from "axios";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import customConstants from "../../utilities/customConstants";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
const ListCategories = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(customConstants.API_LIST_CATEGORIES);
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Error Fetching Data");
    }
  };

  const removeItem = async (id) => {
    const response = await axios.post(customConstants.API_REMOVE_CATEGORY, {
      id,
    });
    const data = await fetchList();
    if (data && response.data.success) {
      setList(data);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
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

  return (
    <FormWrapper>
      <div>
        <div className="categories-table title">
          <p>Image</p>
          <p>Name</p>
          <p>Desc</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="categories-table">
              <img src={`${customConstants.API_IMAGES}` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <img
                onClick={() => removeItem(item._id)}
                className="delete-icon"
                src={assets.delete_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </FormWrapper>
  );
};

export default ListCategories;
