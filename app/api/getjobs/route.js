import connectDB from "@/mongodb/connect";
import AppliedSchema from "@/mongodb/appliedSchema";
import JobSchema from "@/mongodb/jobSchema";

export async function GET(request) {
  try {
    await connectDB();
    const savedJobs = await JobSchema.find();
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
