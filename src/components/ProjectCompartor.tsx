import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScorecardUrl } from "../utils/getScorecardUrl";

function ProjectComparator() {
  const params = useParams();
  const { platform, org, repo, prevCommitHash, currentCommitHash } = params;

  const prevCommitQuery = useQuery({
    queryKey: ["prevCommit"],
    queryFn: () =>
      fetch(
        getScorecardUrl({ platform, org, repo, commitHash: prevCommitHash })
      ).then((res) => res.json()),
  });

  const currentCommitQuery = useQuery({
    queryKey: ["currentCommit"],
    queryFn: () =>
      fetch(
        getScorecardUrl({ platform, org, repo, commitHash: currentCommitHash })
      ).then((res) => res.json()),
  });

  if (prevCommitQuery.isLoading || currentCommitQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (prevCommitQuery.error || currentCommitQuery.error) {
    return (
      <p>{`An error has occurred: ${
        prevCommitQuery.error || currentCommitQuery.error
      }`}</p>
    );
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
