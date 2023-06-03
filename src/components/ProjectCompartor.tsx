import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScorecardUrl } from "../utils/getScorecardUrl";
import { formatDate } from "../utils/formatDate";
import CommonError from "./CommonError";
import Collapsible from "./Collapsable";
import Badge from "./Badge";

import { ScoreElement } from "../types";

import "../styles/ProjectDetails.css";

function ProjectComparator() {
  const params = useParams();
  const { platform, org, repo, prevCommitHash, currentCommitHash } = params;

  const [state, setState] = useState(new Set());

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

  const currentData = currentCommitQuery?.data;
  const previousData = prevCommitQuery?.data;

  useEffect(() => {
    const areEqualDetails = () =>
      currentData?.checks.forEach((e1: ScoreElement, index: number) => {
        if (
          JSON.stringify(e1.details) !==
            JSON.stringify(previousData?.checks[index].details) ||
          JSON.stringify(e1.reason) !==
            JSON.stringify(previousData?.checks[index].reason)
        ) {
          setState(
            (previousState) =>
              new Set([
                ...previousState,
                {
                  areEqual: false,
                  name: previousData.checks[index].name,
                  details: e1.details,
                  reason: e1.reason,
                  score: e1.score,
                  short: e1.documentation.short,
                  url: e1.documentation.url,
                  prevDetails: previousData.checks[index].details,
                  prevReason: previousData.checks[index].reason,
                  prevScore: previousData.score,
                },
              ])
          );
        } else {
          setState(
            (previousState) =>
              new Set([
                ...previousState,
                {
                  areEqual: true,
                  name: e1.name,
                  details: e1.details,
                  reason: e1.reason,
                  score: e1.score,
                  short: e1.documentation.short,
                  url: e1.documentation.url,
                },
              ])
          );
        }
      });
    areEqualDetails();
  }, [currentData, previousData]);

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

  if (prevCommitQuery.isLoading || currentCommitQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (prevCommitQuery.error || currentCommitQuery.error) {
    return <CommonError />;
  }

  return (
    <>
      <h1>OpenSSF Scorecard comparator for {`${org}/${repo}`}</h1>
      <div className="info-badge__wrapper">
        <h2>
            {`Current Score: ${currentData.score}/10`}{" "}
        </h2>
        {scoreChecker(currentData.score, previousData.score)}
      </div>
      <p>Analysis of commits {" "}
        <a
          href={`https://github.com/${org}/${repo}/commit/${currentData.repo.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${currentData.repo.commit.substring(0, 8)})`}
        </a>
        {" "} and {" "}
        <a
          href={`https://github.com/${org}/${repo}/commit/${previousData.repo.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${previousData.repo.commit.substring(0, 8)})`}
        </a>
      </p>
      <p>Date: {formatDate(currentData.date)}</p>
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
      <hr />
      {[...state].map((element: any) => (
        <>
          <div key={element.name} className="card__wrapper">
            <div className="heading__wrapper">
                <div className="info-badge__wrapper">
                <h3>
                    {element.name}
                </h3>
                {scoreChecker(element.score, element.prevScore)}
                </div>
              <span>{element.score}/10</span>
            </div>
            <p>
              Description: {element.short.toLocaleLowerCase()}{" "}
              <a href={`${element.url}`} target="_blank" rel="noreferrer">
                See documentation
              </a>
            </p>
            <p>
              Reasoning: <span>{element?.reason.toLocaleLowerCase()}</span>
            </p>
            {Array.isArray(element.details) && (
              <Collapsible details={element.details} />
            )}
            {(element.prevDetails || element.prevReason) && (
              <>
                <h4>Additional details / variations</h4>
                <p>
                  Previous revision reasoning:{" "}
                  <span>{element.prevReason.toLocaleLowerCase()}</span>
                </p>
                {element.prevDetails && (
                  <Collapsible details={element.prevDetails} />
                )}
              </>
            )}
          </div>
          <hr />
        </>
      ))}
    </>
  );
}

export default ProjectComparator;
