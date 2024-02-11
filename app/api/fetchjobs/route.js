import connectDB from "@/mongodb/connect";
import JobSchema from "@/mongodb/jobSchema";
import axios from "axios";

export async function GET(request) {
  try {
    await connectDB();

    const options = {
      method: "POST",
      url: "https://linkedin-jobs-scraper-api.p.rapidapi.com/jobs",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "6b32f92af5msh45d3c1e32c983e3p1ccfeejsn57c31b1055bf", //openly available so safe to place keys here
        "X-RapidAPI-Host": "linkedin-jobs-scraper-api.p.rapidapi.com",
      },
      data: {
        title: "Software Engineer",
        location: "India",
        rows: 30,
      },
    };

    const response = await axios.request(options);

    await JobSchema.create(response.data);

    return Response.json({
      message: "Fetched Successfully and Added to Database",
      list: response.data,
    });
  } catch (error) {
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
