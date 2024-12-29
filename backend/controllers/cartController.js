import userModel from "../models/userModel";

const addToCart = async (req, res) => {
  try {
    //   req.body.userId will be set by the middleware after converting the token back into the id
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.usreId, { cartData });
    res.status(200).json({
      success: true,
      message: "Item Added to Cart",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to Add Item to Cart",
    });
  }
};

const removeFromCart = async (req, res) => {};

const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
