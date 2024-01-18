"use client";

import { useState } from "react";
import { ButtonSecondary } from "./Button";

const SkillList = ({ skills }: { skills: any[] }) => (
  <ul className="pl-5 list-disc font-medium gap-2 flex flex-col">
    {skills.map((skill: any) => (
      <li key={skill.id}>{skill.name}</li>
    ))}
  </ul>
);

const InfoSection = ({ title, value }: { title: string; value: string }) => (
  <div>
    <p className="text-gray-400">{title}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export const DetailView = ({ data }: any) => {
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const { name, id, skills, role, email } = data;

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
          <h1 className="flex items-center font-semibold pt-4 text-gray-900 rounded-lg hover:bg-blue-100 group">
            {name}
          </h1>
        </div>
        <div className="pb-4">
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
        <div className="">
          {!showSkills ? (
            <div className="flex flex-col gap-4">
              <InfoSection title="Role" value={role} />
              <InfoSection title="Email" value={email} />
            </div>
          ) : (
            <SkillList skills={skills} />
          )}
        </div>
      </div>
    </div>
  );
};
