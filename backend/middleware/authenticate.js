import jwt from "jsonwebtoken";

const authMiddleWare = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User un-authorized, Login Again.",
    });
  }
  try {
    //   We will get the user id in the decoded_token, that we set while creating the token in userRoute
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error",
    });
  }
};

export default authMiddleWare;
