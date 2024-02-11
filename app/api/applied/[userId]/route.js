import connectDB from "@/mongodb/connect";
import ShortURL from "@/mongodb/appliedSchema";
import AppliedSchema from "@/mongodb/appliedSchema";

export async function GET(request, { params: { userId } }) {
  try {
    await connectDB();
    const savedJobs = await AppliedSchema.find({ userId });
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
