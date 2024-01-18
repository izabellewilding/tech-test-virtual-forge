"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ButtonSecondary } from "../../../components/Button";
import { ResourceType } from "../../../lib/types";

export default function ResourcePage() {
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const params = useParams();
  console.warn(params);
  const resourceId = params.id;

  console.warn(resourceId);

  const resourceById = useQuery<ResourceType>({
    queryKey: ["resourceById", resourceId],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${resourceId}`).then(
        (res) => res.json()
      ),
  });

  // const skillsData = useQuery({
  //   queryKey: ["resourceSkills"],
  //   queryFn: () =>
  //     fetch("http://localhost:4000/skills").then((res) => res.json()),
  // });

  const skillsById = useQuery({
    queryKey: ["skillsById", resourceId],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resources/${resourceId}/skills`
      ).then((res) => res.json()),
  });

  if (resourceById.isPending || skillsById.isPending) return "Loading...";

  if (resourceById.error)
    return "An error has occurred: " + resourceById.error.message;

  const resourceInitials = () => {
    const words: string[] = resourceById.data.name.split(" ");
    const initialis = words
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return initialis;
  };

  return (
    <div className="p-9 pt-4 flex flex-row">
      <p
        style={{ height: "57px", width: "60px", padding: "15px" }}
        className="bg-slate-200 rounded-full font-semibold font"
      >
        {resourceInitials()}
      </p>
      <div className="flex flex-col pl-8 gap-6">
        <div className="pb-4">
          <h1 className="flex items-center font-semibold p-2  text-gray-900 rounded-lg hover:bg-blue-100 group">
            {resourceById.data.name}
          </h1>
        </div>
        <div className="">
          <ButtonSecondary
            lighter
            onClick={() => setShowSkills(false)}
            selected={!showSkills}
          >
            Overview
          </ButtonSecondary>
          <ButtonSecondary
            lighter
            onClick={() => setShowSkills(true)}
            selected={showSkills}
          >
            Skills
          </ButtonSecondary>
        </div>
        <div className="pl-2">
          {showSkills ? (
            skillsById.data ? (
              <ul className="pt-4 list-disc font-semibold">
                {skillsById.data.map((skill: any) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            ) : (
              "Data is currenly unavailable available."
            )
          ) : (
            <div>Overview</div>
          )}
        </div>
      </div>
    </div>
  );
}
