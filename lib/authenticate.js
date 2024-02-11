import jwt from "jsonwebtoken";
import UserModel from "@/mongodb/userSchema";

const secretKey = process.env.NEXTAUTH_JWT_SECRET;

export const authenticate = async (credentials) => {
  const { email, password } = credentials;

  let res = await UserModel.findOne({ email });

  if (res) {
    const accessToken = jwt.sign({ email: email }, secretKey, {
      expiresIn: "1h",
    });
    return {
      status: 202,
      token: accessToken,
      user: res,
    };
  } else if (email === res.email && password !== res.password) {
    return {
      status: 404,
      error: "invalid_password",
    };
  } else {
    return {
      status: 404,
      error: "invalid_user",
    };
  }
};
