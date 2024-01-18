"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import { Resource } from "../../lib/types";
import Link from "next/link";

interface SideNavigationProps {
  children: React.ReactNode;
}

export const SideNavigation = ({ children }: SideNavigationProps) => {
  const [reversed, setReversed] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["resourceData"],
    queryFn: () =>
      fetch("http://localhost:4000/resources").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const orderedData = data.sort((a: Resource, b: Resource) =>
    a.name[0].localeCompare(b.name[0])
  );
  const reverseOrderedData = [...orderedData].reverse();

  const finalData = reversed ? reverseOrderedData : orderedData;

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-100 bg-blue-50 p-1"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center text-gray-900 rounded-lg group">
              <p className="bg-purple-700 text-purple-200 p-2 rounded-md text-lg">
                VF
              </p>
              <h1 className="ms-3 uppercase font-semibold">Resourcing</h1>
            </div>
            <div className="flex flex-row py-2 justify-between border-y-2 border-gray-300">
              <p className="pl-2 self-center text-sm font-semibold">Sort</p>
              <div className="flex gap-2">
                <ButtonSecondary
                  onClick={() => setReversed(false)}
                  selected={!reversed}
                >
                  A-Z
                </ButtonSecondary>
                <ButtonSecondary
                  onClick={() => setReversed(true)}
                  selected={reversed}
                >
                  Z-A
                </ButtonSecondary>
              </div>
            </div>
            <ul className="space-y-2 font-medium">
              {finalData.map((item: Resource) => (
                <li key={item.id}>
                  <Link
                    href={item.id}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 group"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ButtonPrimary onClick={() => {}}>+ New Resource</ButtonPrimary>
        </div>
      </aside>
      <div className="sm:ml-72">{children}</div>
    </>
  );
};
