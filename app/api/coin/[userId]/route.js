import UserSchema from "@/mongodb/userSchema";

export async function POST(request) {
  try {
    await connectDB();

    await ShortURL.updateOne(
      {
        short: shortUrl,
      },
      { $inc: { clicks: 1 } }
    );

    return Response.json({
      message: "Fetched Successfully",
      list: savedJobs,
    });
  } catch (error) {
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
