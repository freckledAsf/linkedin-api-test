import { Profile } from "@/types/RapidAPI";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { linkedin_url } = await req.json();
    if (!linkedin_url) throw Error("Linkedin url not specified");

    const options = {
      method: "GET",
      url: "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile",
      params: {
        linkedin_url,
        include_skills: "true",
      },
      headers: {
        "X-RapidAPI-Key": process.env.XRAPID_API_KEY,
        "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com",
      },
    };

    const res = await axios.request(options);
    const data: Profile = res.data.data;
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
