"use client";

import { useQuery } from "@tanstack/react-query";
import { Resource } from "../lib/types";

export default function Resource() {
  const resourceId = window.location.pathname.slice(1);

  const resourceByIdData = useQuery({
    queryKey: ["resourceById", resourceId],
    queryFn: () =>
      fetch(`http://localhost:4000/resources/${resourceId}`).then((res) =>
        res.json()
      ),
  });

  const skillsData = useQuery({
    queryKey: ["resourceSkills"],
    queryFn: () =>
      fetch("http://localhost:4000/skills").then((res) => res.json()),
  });

  if (resourceByIdData.isPending) return "Loading...";

  if (resourceByIdData.error)
    return "An error has occurred: " + resourceByIdData.error.message;

  return (
    <div className="pl-10">
      <h1 className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 group">
        {resourceByIdData.data.name}
      </h1>
    </div>
  );
}
