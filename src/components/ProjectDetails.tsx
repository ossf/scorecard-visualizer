import React from "react";
import { useParams } from "react-router-dom";

function ProjectDetails(){
    const params = useParams();
    const {org, repo} = params;

    return (
        <>
        <h1>Project Details</h1>
        <p>{`Scoring details for: ${org}/${repo}`}</p>
        </>
    )
};

export default ProjectDetails;