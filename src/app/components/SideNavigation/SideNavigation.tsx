"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../Button";
import { Resource } from "../../lib/types";
import Link from "next/link";

interface SideNavigationProps {
  children: React.ReactNode;
}

export const SideNavigation = ({ children }: SideNavigationProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:4000/resources").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto">
          <div>
            <p className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <p className=" bg-indigo-600 text-white p-2 rounded-md text-lg">
                VF
              </p>
              <span className="ms-3 uppercase">Resourcing</span>
            </p>

            <ul className="space-y-2 font-medium">
              {data.map((item: Resource) => (
                <li>
                  <Link
                    href={item.name}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <span className="ms-3 uppercase">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Button className="bg-indigo-600 px-5">+ New Resource</Button>
        </div>
      </aside>
      <div className="sm:ml-64">{children}</div>
    </>
  );
};
