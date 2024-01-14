import { Profile } from "@/types/RapidAPI";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { profile_id } = await req.json();
    if (!profile_id) throw Error("Profile id not specified");

    const { data } = await axios.post(
      "https://api.iscraper.io/v2/profile-details",
      {
        profile_id,
        profile_type: "personal",
        bypass_cache: false,
        related_profiles: false,
        network_info: false,
        contact_info: true,
      },
      {
        headers: {
          "X-API-KEY": process.env.ISCRAPER_API_KEY,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
