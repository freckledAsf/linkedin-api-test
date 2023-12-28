import { Profile } from "@/types";
import Image from "next/image";

interface Props {
  profile: Profile;
}

const ProfileCard = ({ profile }: Props) => (
  <div className="flex flex-col rounded-md gap-4 border p-4">
    <div className="flex items-center gap-6">
      <div className="relative rounded-full overflow-hidden h-12 w-12">
        <Image
          src={profile.profile_image_url}
          alt={`${profile.full_name} avatar`}
          fill
        />
      </div>
      <p className="font-semibold">{profile.full_name}</p>
    </div>
  </div>
);

export default ProfileCard;
