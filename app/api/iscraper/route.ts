import { Profile } from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { profile_id } = await req.json();
    if (!profile_id) throw Error("Profile id not specified");

    const options = {
      method: "GET",
      url: "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile",
      params: {
        profile_id,
        profile_type: "personal",
        bypass_cache: false,
        related_profiles: false,
        network_info: false,
        contact_info: true,
      },
      headers: {
        "X-API-Key": process.env.ISCRAPER_API_KEY,
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
