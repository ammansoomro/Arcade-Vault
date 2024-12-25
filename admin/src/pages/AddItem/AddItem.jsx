import React, { useState } from "react";
import "./AddItem.css";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { assets } from "../../assets/assets";
import customConstants from "../../utilities/customConstants";
import axios from "axios";
import { toast } from "react-toastify";

const AddItem = () => {
  const [inputs, setInputs] = useState(customConstants.INITIAL_ADD_ITEM_INPUT);
  const [image, setImage] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(inputs).forEach((key) => formData.append(key, inputs[key]));
      formData.append("image", image);

      const response = await axios.post(customConstants.API_ADD_ITEM, formData);

      if (response.data.success) {
        setInputs(customConstants.INITIAL_ADD_ITEM_INPUT);
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to add item. Please try again.");
    }
  };

  return (
    <FormWrapper>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="input-gap">
            <p>Item Name</p>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Product Name Here"
              value={inputs.name}
              required
              onChange={handleInput}
            />
          </div>

          <div className="input-gap">
            <p>Item Price</p>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="$99"
              value={inputs.price}
              onChange={handleInput}
              required
            />
          </div>
          <div className="input-gap">
            <p>Item Category</p>
            <select
              name="category"
              id="category"
              onChange={handleInput}
              value={inputs.category}
            >
              <option value="Games">Games</option>
              <option value="Consoles">Consoles</option>
              <option value="Controllers">Controllers</option>
              <option value="Headsets">Headsets</option>
              <option value="Subscriptions">Subscriptions</option>
            </select>
          </div>
          <div className="input-gap upload-image-container">
            <p>Upload Image</p>

            {image && <img src={URL.createObjectURL(image)} alt="" />}

            {!image && (
              <>
                <label className="upload-image-label" htmlFor="image">
                  <img src={assets.upload_icon} alt="" />
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImage}
                  required
                  hidden
                />
              </>
            )}
          </div>
          <div className="input-gap">
            <p>Item Description</p>
            <textarea
              name="desc"
              id="desc"
              placeholder="Write Product Description Here"
              rows={6}
              value={inputs.desc}
              onChange={handleInput}
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Add
        </button>
      </form>
    </FormWrapper>
  );
};

export default AddItem;
