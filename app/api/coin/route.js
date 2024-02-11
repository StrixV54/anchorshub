import connectDB from "@/mongodb/connect";
import UserSchema from "@/mongodb/userSchema";

export async function POST(request) {
  try {
    await connectDB();

    const { email, coins } = await request.json();

    await UserSchema.updateOne({ email: email }, { $inc: { coin: +coins } });

    return Response.json({
      message: "Set Successfully",
    });
  } catch (error) {
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
