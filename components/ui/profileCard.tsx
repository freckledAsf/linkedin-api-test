import { Profile } from "@/types/RapidAPI";
import Image from "next/image";

interface Props {
  imageUrl: string;
  fullName: string;
}

const ProfileCard = ({ imageUrl, fullName }: Props) => (
  <div className="flex flex-col rounded-md gap-4 border p-4">
    <div className="flex items-center gap-6">
      <div className="relative rounded-full overflow-hidden h-12 w-12">
        {imageUrl && imageUrl != "" && (
          <Image src={imageUrl} alt={`${fullName} avatar`} fill />
        )}
      </div>
      <p className="font-semibold">{fullName}</p>
    </div>
  </div>
);

export default ProfileCard;
