"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "../lib/types";
import { ButtonSecondary } from "../components/Button";

export default function Resource() {
  const [showSkills, setShowSkills] = useState(false);
  const resourceId = window.location.pathname.slice(1);

  const resourceById = useQuery({
    queryKey: ["resourceById", resourceId],
    queryFn: () =>
      fetch(`http://localhost:4000/resources/${resourceId}`).then((res) =>
        res.json()
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
      fetch(`http://localhost:4000/resources/${resourceId}/skills`).then(
        (res) => res.json()
      ),
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
    <div className="p-9 pt-4">
      <div className="flex flex-row">
        <p className="bg-slate-200 rounded-full p-4 font-semibold font">
          {resourceInitials()}
        </p>
        <h1 className="flex items-center font-semibold p-2 pl-4 text-gray-900 rounded-lg hover:bg-blue-100 group">
          {resourceById.data.name}
        </h1>
      </div>
      <div>
        <ButtonSecondary lighter onClick={() => setShowSkills(false)}>
          Overview
        </ButtonSecondary>
        <ButtonSecondary lighter onClick={() => setShowSkills(true)}>
          Skills
        </ButtonSecondary>
      </div>
      {showSkills ? (
        skillsById.data.map((skill: any) => (
          <ul className="pt-4 pl-10 list-disc font-semibold">
            <li>{skill.name} </li>
          </ul>
        ))
      ) : (
        <div>Overview</div>
      )}
    </div>
  );
}
