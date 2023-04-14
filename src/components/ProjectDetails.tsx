import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProjectDetails(){
    const params = useParams();
    const {platform, org, repo} = params;

    const { isLoading, error, data } = useQuery({
        queryKey: ['projectData'],
        queryFn: () =>
          fetch(`https://api.securityscorecards.dev/projects/${platform}/${org}/${repo}`).then(
            (res) => res.json(),
          ),
    })

    if (isLoading){
        return (
            <p>Loading...</p>
        )
    }

    if (error){
        return (
            <p>{`An error has occurred: ${error}`}</p>
        )
    }
    
    return (
        <>
        <h1>Project Details</h1>
        <p>{`Scoring details for: ${org}/${repo}`}</p>
        <small>Want to check the full report? Please check{' '}
            <a href={`https://deps.dev/project/github/${org}%2F${repo}`} target="_blank" rel="noreferrer">
            {' '}deps.dev
            </a>
        </small>
        <br />
        <small>
            {`Check also the ${org}`}
            <a href={`https://github.com/${org}/${repo}`} target="_blank" rel="noreferrer">
            {' '}repo
            </a>
        </small>
        <pre>
            <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
        </>
    )
};

export default ProjectDetails;