"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ButtonSecondary } from "./Button";
import { ResourceType } from "../lib/types";

export const DetailView = ({ data }: any) => {
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const { name, id, skills, role, email } = data;
  const params = useParams();
  console.warn(params);
  const resourceId = params.id;

  console.warn(resourceId);

  //   if (resourceById.isPending || skillsById.isPending) return "Loading...";

  //   if (resourceById.error)
  //     return "An error has occurred: " + resourceById.error.message;

  const resourceInitials = () => {
    const words: string[] = data.name.split(" ");
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
            {name}
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
            skills ? (
              <ul className="pt-4 list-disc font-semibold">
                {skills.map((skill: any) => (
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
};
