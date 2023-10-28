import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getScorecardUrl } from "../utils/getScorecardUrl";
import { formatDate } from "../utils/formatDate";
import CommonError from "./CommonError";
import Collapsible from "./Collapsable";
import Loading from "./Loading";

import { ScoreElement } from "../types";

import "../styles/ProjectDetails.css";

function ProjectDetails() {
  const params = useParams();
  const { platform, org, repo, commitHash } = params;

  const { isLoading, error, data } = useQuery({
    queryKey: ["projectData"],
    queryFn: async () => {
      const response = await fetch(
        getScorecardUrl({ platform, org, repo, commitHash }),
      );
      if (response.status >= 500) {
        throw new Error("An error ocurred. Invalid response from server");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <CommonError />;
  }

  return (
    <>
      <h1>OpenSSF Scorecard for {`${org}/${repo}`}</h1>
      <h2>{`Score: ${data.score}/10`}</h2>
      <p data-testid="date">Date: {formatDate(data.date)}</p>
      <p data-testid="scorecard-version">
        Scorecard version {data.scorecard.version}{" "}
        <a
          href={`https://github.com/ossf/scorecard/commit/${data.scorecard.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${data.scorecard.commit.substring(0, 8)})`}
        </a>
      </p>
      <p data-testid="current-commit">
        Current commit{" "}
        <a
          href={`https://${platform}/${org}/${repo}/commit/${data.repo.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${data.repo.commit.substring(0, 8)})`}
        </a>
      </p>
      <p data-testid="deps-dev">
        Additional info at{" "}
        <a
          href={`https://deps.dev/project/github/${org}%2F${repo}`}
          target="_blank"
          rel="noreferrer"
        >
          deps.dev
        </a>
      </p>
      <p data-testid="step-security">
        Improve your scoring with{" "}
        <a
          href={`https://app.stepsecurity.io/securerepo?repo=${org}/${repo}`}
          target="_blank"
          rel="noreferrer"
        >
          StepSecurity
        </a>
      </p>
      <hr />
      {data.checks.map((element: ScoreElement) => (
        <>
          <div key={element.name} className="card__wrapper">
            <div className="heading__wrapper" data-testid={element.name}>
              <h3>{element.name}</h3>
              <span>{element.score}/10</span>
            </div>
            <p>
              Description: {element.documentation.short.toLocaleLowerCase()}{" "}
              <a
                href={`${element.documentation.url}`}
                target="_blank"
                rel="noreferrer"
              >
                See documentation
              </a>
            </p>
            <p>Reasoning: {element?.reason.toLocaleLowerCase()}</p>
            {Array.isArray(element.details) && (
              <Collapsible details={element.details} />
            )}
          </div>
          <hr />
        </>
      ))}
    </>
  );
}

export default ProjectDetails;
