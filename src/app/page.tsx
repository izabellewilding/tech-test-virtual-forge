"use client";

import Image from "next/image";
import { SideNavbar } from "./components/SideNavigation";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:4000/resources").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SideNavbar navItems={data}>
        <p>Hello</p>
      </SideNavbar>
    </main>
  );
}
