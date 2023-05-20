interface paramsTypes {
  platform: string | undefined;
  org: string | undefined;
  repo: string | undefined;
  commitHash: string | undefined;
}

export const getScorecardUrl = (params: paramsTypes): string => {
  let baseUrl = `https://api.securityscorecards.dev/projects/${params.platform}/${params.org}/${params.repo}`;
  if (params.commitHash) {
    baseUrl += `/?commit=${params.commitHash}`;
  }
  return baseUrl;
};
