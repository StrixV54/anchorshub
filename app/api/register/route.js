import connectDB from "@/mongodb/connect";
import UserModel from "@/mongodb/userSchema";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    let res = await UserModel.findOne({ email });

    if (res)
      return new Response(
        JSON.stringify({ message: "Email already present." }),
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    res = new UserModel({ fullname: name, email, password: hashedPassword });
    await res.save();
    return Response.json({
      message: "Successfully created the record.",
      name: res?.fullname,
      userId: res?._id,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
