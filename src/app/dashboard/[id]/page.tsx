"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { DetailView } from "../../../components/DetailView";

export default function ResourcePage() {
  const params = useParams();
  const resourceId = params.id;

  const query = useQuery({
    queryKey: ["combinedData", resourceId],
    queryFn: async () => {
      try {
        const resourceResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/resources/${resourceId}`
        );
        const resourceData = await resourceResponse.json();

        const skillsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/resources/${resourceId}/skills`
        );
        const skillsData = await skillsResponse.json();

        return { ...resourceData, skills: skillsData };
      } catch (error) {
        throw new Error("Failed to fetch combined data");
      }
    },
  });
  const queryData = query.data;
  const queryError = query.error;
  const queryPending = query.isPending;

  if (queryPending) return <p>Loading, please wait.. </p>;

  if (queryError) return "An error has occurred: " + queryError.message;

  return <DetailView data={queryData} />;
}
