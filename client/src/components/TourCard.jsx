import { Building2 } from "lucide-react";
import Avatar from "./Avatar";

function TourCard({
  _id,
  title,
  description,
  cities,
  photos,
  user,
  startDate,
  endDate,
  createdAt,
  updatedAt,
}) {
  const { name, email } = user;

  return (
    <div className="border border-gray-500 px-4 py-2 rounded-md shadow-md">
      <h2 className="text-xl">{title}</h2>
      <p className="text-xs text-gray-500">{description}</p>
      <p className="my-2">
        <Building2 className="inline-block mr-1" />{" "}
        {cities.map((city) => {
          return (
            <span
              key={city}
              className="mr-2 text-sm bg-gray-300 px-4 py-0.5 rounded-full"
            >
              {city}
            </span>
          );
        })}
      </p>
      <div className="flex items-center">
        <span className="mr-2">Posted by:</span>{" "}
        <Avatar name={name} size={"small"} /> <strong>{name}</strong> ({email})
      </div>

      <div className="flex">
        {photos.map((photos, index) => {
          return (
            <img
              key={index}
              src={photos}
              alt={`Tour Photo ${index + 1}`}
              className="w-25 h-auto mt-2 rounded-md object-cover mx-2 cursor-pointer"
            />
          );
        })}
      </div>
    </div>
  );
}

export default TourCard;
