import React, { useState } from "react";
import "./AddItem.css";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { assets } from "../../assets/assets";
const AddItem = () => {
  const [inputs, setInputs] = useState(null);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSociety(inputs, dispatch);
    resetInputFields();
    History.push("/");
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <FormWrapper>
      <form className="flex-col form-content">
        <div className="input-gap">
          <p>Item Name</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name Here"
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-gap">
          <p>Item Price</p>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="$99"
            required
          />
        </div>
        <div className="input-gap">
          <p>Item Category</p>
          <select name="category" id="category" onChange={handleChange}>
            <option value="Games">Games</option>
            <option value="Consoles">Consoles</option>
          </select>
        </div>
        <div className="input-gap upload-image-container">
          <p>Upload Image</p>

          {image && <img src={URL.createObjectURL(image)} alt="" />}

          {!image && (
            <>
              <label class="upload-image-label" htmlFor="image">
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
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </form>
      <button type="submit" className="submit-button">
        Add
      </button>
    </FormWrapper>
  );
};

export default AddItem;
