import AppliedSchema from "@/mongodb/appliedSchema";
import connectDB from "@/mongodb/connect";

export async function POST(request) {
  try {
    await connectDB();
    const { id, userId, jobdetails } = await request.json();

    let res = await AppliedSchema.findOne({ id, userId });

    if (res)
      return new Response(JSON.stringify({ message: "Job already applied." }), {
        status: 400,
      });

    res = new AppliedSchema({ id, userId, ...jobdetails });
    await res.save();

    return Response.json({
      message: "Successfully created the record.",
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
