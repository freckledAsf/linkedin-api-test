import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const options = {
    method: "GET",
    url: "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile",
    params: {
      linkedin_url: "https://www.linkedin.com/in/yifenghan/",
      include_skills: "true",
    },
    headers: {
      "X-RapidAPI-Key": process.env.XRAPID_API_KEY,
      "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com",
    },
  };

  try {
    const res = await axios.request(options);
    console.log(res.data);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
