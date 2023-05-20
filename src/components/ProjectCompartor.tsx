import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScorecardUrl } from "../utils/getScorecardUrl";
import CommonError from "./CommonError";
import Badge from "./Badge";

import "../styles/ProjectDetails.css";

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

  const currentData = currentCommitQuery?.data;
  const previousData = prevCommitQuery?.data;

  const scoreChecker = (currentValue: number, previousValue: number) => {
    const result = currentValue - previousValue;

    if (result > 0) {
      return (
        <Badge variant="increased" message={`Increased ${result.toFixed(1)}`} />
      );
    }

    if (result < 0) {
      return (
        <Badge variant="decreased" message={`Decreased ${result.toFixed(1)}`} />
      );
    }

    return <Badge message={"Unchanged"} />;
  };

  return (
    <>
      <h1>OpenSSF Scorecard comparator for {`${org}/${repo}`}</h1>
      <h3>{`Analysis of commit ${prevCommitHash?.substring(
        0,
        8
      )} and commit ${currentCommitHash?.substring(0, 8)}`}</h3>
      <h2>
        {`Current Score: ${currentData.score}/10`}{" "}
        {scoreChecker(currentData.score, previousData.score)}
      </h2>
      <p>Date: {currentData.date}</p>
      <p>
        Scorecard version {currentData.scorecard.version}{" "}
        <a
          href={`https://github.com/ossf/scorecard/commit/${currentData.scorecard.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${currentData.scorecard.commit.substring(0, 8)})`}
        </a>
      </p>
      <p>
        Current commit{" "}
        <a
          href={`https://github.com/${org}/${repo}/commit/${currentData.repo.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${currentData.repo.commit.substring(0, 8)})`}
        </a>
      </p>
      <p>
        Previous commit{" "}
        <a
          href={`https://github.com/${org}/${repo}/commit/${previousData.repo.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${previousData.repo.commit.substring(0, 8)})`}
        </a>
      </p>
    </>
  );
}

export default ProjectComparator;
