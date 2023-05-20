import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScorecardUrl } from "../utils/getScorecardUrl";
import CommonError from "./CommonError";

function ProjectComparator() {
  const params = useParams();
  const { platform, org, repo, prevCommitHash, currentCommitHash } = params;

  const prevCommitQuery = useQuery({
    queryKey: ["prevCommit"],
    queryFn: async () => {
      const response = await fetch(
        getScorecardUrl({ platform, org, repo, commitHash: prevCommitHash })
      );
      if (response.status >= 400) {
        throw new Error("An error ocurred. Invalid response from server");
      }
      return response.json();
    },
  });

  const currentCommitQuery = useQuery({
    queryKey: ["currentCommit"],
    queryFn: async () => {
      const response = await fetch(
        getScorecardUrl({ platform, org, repo, commitHash: currentCommitHash })
      );
      if (response.status >= 400) {
        throw new Error("An error ocurred. Invalid response from server");
      }
      return response.json();
    },
  });

  if (prevCommitQuery.isLoading || currentCommitQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (prevCommitQuery.error || currentCommitQuery.error) {
    return <CommonError />;
  }

  return (
    <>
      <h1>OpenSSF Scorecard comparator for {`${org}/${repo}`}</h1>
      <h3>{`Analysis of commit ${prevCommitHash?.substring(
        0,
        8
      )} and commit ${currentCommitHash?.substring(0, 8)}`}</h3>
    </>
  );
}

export default ProjectComparator;
