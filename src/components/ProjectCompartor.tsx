import { useParams } from "react-router-dom";

function ProjectComparator() {
  const params = useParams();
  const { org, repo, prevCommitHash, currentCommitHash } = params;

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
