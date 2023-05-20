import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScorecardUrl } from "../utils/getScorecardUrl";

import "./ProjectDetails.css";
interface ScoreElement {
  name: string;
  score: number;
  reason: string;
  details: string[];
  documentation: {
    short: string;
    url: string;
  };
}

function ProjectDetails() {
  const params = useParams();
  const { platform, org, repo, commitHash } = params;

  const { isLoading, error, data } = useQuery({
    queryKey: ["projectData"],
    queryFn: () =>
      fetch(getScorecardUrl({ platform, org, repo, commitHash })).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{`An error has occurred: ${error}`}</p>;
  }

  return (
    <>
      <h1>OpenSSF Scorecard for {`${org}/${repo}`}</h1>
      <h2>{`Score: ${data.score}/10`}</h2>
      <p>Date: {data.date}</p>
      <p>
        Scorecard version {data.scorecard.version}{" "}
        <a
          href={`https://github.com/ossf/scorecard/commit/${data.scorecard.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${data.scorecard.commit.substring(0, 8)})`}
        </a>
      </p>
      <p>
        Current commit{" "}
        <a
          href={`https://github.com/${org}/${repo}/commit/${data.repo.commit}`}
          target="_blank"
          rel="noreferrer"
        >
          {`(${data.repo.commit.substring(0, 8)})`}
        </a>
      </p>
      <p>
        Additional info at{" "}
        <a
          href={`https://deps.dev/project/github/${org}%2F${repo}`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          deps.dev
        </a>
      </p>
      <p>
        Improve your scoring with{" "}
        <a
          href={`https://app.stepsecurity.io/securerepo?repo=${org}/${repo}`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          StepSecurity
        </a>
      </p>
      <hr />
      {data.checks.map((element: ScoreElement) => (
        <>
          <div key={element.name} className="card__wrapper">
            <div className="heading__wrapper">
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
              <>
                <p>Details:</p>
                <div className="details__wrapper">
                  <ul>
                    {element.details.map((el: string, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
          <hr />
        </>
      ))}
    </>
  );
}

export default ProjectDetails;
