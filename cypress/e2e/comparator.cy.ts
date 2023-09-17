describe("Comparator", () => {
  it("should render error when organization or repository does not exist", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=2ac5e9889aba461f5a54d320973d2574980d206b",
      {
        statusCode: 404,
      },
    ).as("getDataPreviousCommit");

    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=077fd7d83d7d41695137c1af5b9be1d72250e69e",
      {
        statusCode: 404,
      },
    ).as("getDataCurrentCommit");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node/compare/2ac5e9889aba461f5a54d320973d2574980d206b/077fd7d83d7d41695137c1af5b9be1d72250e69e",
    );
    cy.wait("@getDataPreviousCommit"); // first try as react query behaves
    cy.wait("@getDataPreviousCommit"); // second try
    cy.wait("@getDataPreviousCommit"); // third try
    cy.wait("@getDataCurrentCommit"); // first try as react query behaves
    cy.wait("@getDataCurrentCommit"); // second try
    cy.wait("@getDataCurrentCommit"); // third try
    cy.get("h1", { timeout: 10000 }).should(
      "contain",
      "An error ocurred. Please refresh/try again.",
    );
    cy.get("p", { timeout: 10000 }).should(
      "contain",
      "Please check if the org/repository/commit has been analysed by the Scorecard.",
    );
  });
  it("should render error when the previous commit hash does not exist", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=2ac5e9889aba461f5a54d320973d2574980d206b",
      {
        statusCode: 404,
      },
    ).as("getDataPreviousCommit");

    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=077fd7d83d7d41695137c1af5b9be1d72250e69e",
      {
        statusCode: 200,
        fixture: "077fd7d83d7d41695137c1af5b9be1d72250e69e.json",
      },
    ).as("getDataCurrentCommit");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node/compare/2ac5e9889aba461f5a54d320973d2574980d206b/077fd7d83d7d41695137c1af5b9be1d72250e69e",
    );
    cy.wait("@getDataPreviousCommit"); // first try as react query behaves
    cy.wait("@getDataPreviousCommit"); // second try
    cy.wait("@getDataPreviousCommit"); // third try
    cy.wait("@getDataCurrentCommit"); // first try

    cy.get("h1", { timeout: 10000 }).should(
      "contain",
      "An error ocurred. Please refresh/try again.",
    );
    cy.get("p", { timeout: 10000 }).should(
      "contain",
      "Please check if the org/repository/commit has been analysed by the Scorecard.",
    );
  });
  it("should render error when the current commit hash does not exist", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=2ac5e9889aba461f5a54d320973d2574980d206b",
      {
        statusCode: 200,
        fixture: "2ac5e9889aba461f5a54d320973d2574980d206b.json",
      },
    ).as("getDataPreviousCommit");

    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=077fd7d83d7d41695137c1af5b9be1d72250e69e",
      {
        statusCode: 404,
      },
    ).as("getDataCurrentCommit");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node/compare/2ac5e9889aba461f5a54d320973d2574980d206b/077fd7d83d7d41695137c1af5b9be1d72250e69e",
    );
    cy.wait("@getDataPreviousCommit"); // first try as react query behaves
    cy.wait("@getDataCurrentCommit"); // first try as react query behaves
    cy.wait("@getDataCurrentCommit"); // second try
    cy.wait("@getDataCurrentCommit"); // third try

    cy.get("h1", { timeout: 10000 }).should(
      "contain",
      "An error ocurred. Please refresh/try again.",
    );
    cy.get("p", { timeout: 10000 }).should(
      "contain",
      "Please check if the org/repository/commit has been analysed by the Scorecard.",
    );
  });
  it("should compare data from each commit as expected", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=2ac5e9889aba461f5a54d320973d2574980d206b",
      {
        statusCode: 200,
        fixture: "2ac5e9889aba461f5a54d320973d2574980d206b.json",
      },
    ).as("getDataPreviousCommit");

    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=077fd7d83d7d41695137c1af5b9be1d72250e69e",
      {
        statusCode: 200,
        fixture: "077fd7d83d7d41695137c1af5b9be1d72250e69e.json",
      },
    ).as("getDataCurrentCommit");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node/compare/2ac5e9889aba461f5a54d320973d2574980d206b/077fd7d83d7d41695137c1af5b9be1d72250e69e",
    );
    cy.wait("@getDataPreviousCommit"); // first try as react query behaves
    cy.wait("@getDataCurrentCommit"); // first try as react query behaves

    cy.get("h1").should(
      "contain",
      "OpenSSF Scorecard comparator for nodejs/node",
    );

    cy.get('[data-testid="current-score-and-badge"] > h2').should(
      "contain",
      "Score: 7.3/10",
    );

    cy.get('[data-testid="current-score-and-badge"] > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");

    cy.get('[data-testid="commits-analysis"]').should(
      "contain",
      "Analysis of commits (077fd7d8) and (2ac5e988)",
    );

    cy.get('[data-testid="commits-analysis"] > a:first-child')
      .should("contain", "(077fd7d8)")
      .and("have.attr", "href")
      .and(
        "include",
        "https://github.com/nodejs/node/commit/077fd7d83d7d41695137c1af5b9be1d72250e69e",
      );

    cy.get('[data-testid="commits-analysis"] > a:last-child')
      .should("contain", "(2ac5e988)")
      .and("have.attr", "href")
      .and(
        "include",
        "https://github.com/nodejs/node/commit/2ac5e9889aba461f5a54d320973d2574980d206b",
      );

    // @TODO: restore when https://github.com/KoolTheba/openssf-scorecard-api-visualizer/actions/runs/5457182231/jobs/9930918315?pr=106 is solved
    // cy.get('[data-testid="date"]').should("contain", "Date: June 8, 2023");

    cy.get('[data-testid="scorecard-version"]').should(
      "contain",
      "Scorecard version v4.10.5 (27cfe92e)",
    );

    cy.get('[data-testid="Binary-Artifacts"]').should(
      "contain",
      "Binary-Artifacts",
    );
    cy.get('[data-testid="Binary-Artifacts"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Binary-Artifacts"] > span').should("contain", "0/10");

    cy.get('[data-testid="Branch-Protection"]').should(
      "contain",
      "Branch-Protection",
    );
    cy.get('[data-testid="Branch-Protection"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Branch-Protection"] > span').should(
      "contain",
      "-1/10",
    );

    cy.get('[data-testid="CI-Tests"]').should("contain", "CI-Tests");
    cy.get('[data-testid="CI-Tests"] > div > span')
      .should("contain", "Decreased -1")
      .and("have.css", "background-color")
      .and("eq", "rgb(220, 53, 69)");
    cy.get('[data-testid="CI-Tests"] > span').and("contain", "9/10");
    cy.get('[data-testid="CI-Tests"] ~ h4').should(
      "contain",
      "Additional details / variations",
    );

    cy.get('[data-testid="CII-Best-Practices"]').should(
      "contain",
      "CII-Best-Practices",
    );
    cy.get('[data-testid="CII-Best-Practices"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="CII-Best-Practices"] > span').should(
      "contain",
      "5/10",
    );

    cy.get('[data-testid="Code-Review"]').should("contain", "Code-Review");
    cy.get('[data-testid="Code-Review"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Code-Review"] > span').should("contain", "0/10");
    cy.get('[data-testid="Code-Review"] ~ h4').should(
      "contain",
      "Additional details / variations",
    );

    cy.get('[data-testid="Contributors"]').should("contain", "Contributors");
    cy.get('[data-testid="Contributors"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Contributors"] > span').should("contain", "10/10");

    cy.get('[data-testid="Dangerous-Workflow"]').should(
      "contain",
      "Dangerous-Workflow",
    );
    cy.get('[data-testid="Dangerous-Workflow"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Dangerous-Workflow"] > span').should(
      "contain",
      "10/10",
    );

    cy.get('[data-testid="Dependency-Update-Tool"]').should(
      "contain",
      "Dependency-Update-Tool",
    );
    cy.get('[data-testid="Dependency-Update-Tool"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Dependency-Update-Tool"] > span').should(
      "contain",
      "10/10",
    );

    cy.get('[data-testid="Fuzzing"]').should("contain", "Fuzzing");
    cy.get('[data-testid="Fuzzing"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Fuzzing"] > span').should("contain", "10/10");

    cy.get('[data-testid="License"]').should("contain", "License");
    cy.get('[data-testid="License"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="License"] > span').should("contain", "9/10");

    cy.get('[data-testid="Maintained"]').should("contain", "Maintained");
    cy.get('[data-testid="Maintained"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Maintained"] > span').should("contain", "10/10");
    cy.get('[data-testid="Maintained"] ~ h4').should(
      "contain",
      "Additional details / variations",
    );

    cy.get('[data-testid="Packaging"]').should("contain", "Packaging");
    cy.get('[data-testid="Packaging"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Packaging"] > span').should("contain", "-1/10");

    cy.get('[data-testid="Pinned-Dependencies"]').should(
      "contain",
      "Pinned-Dependencies",
    );
    cy.get('[data-testid="Pinned-Dependencies"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Pinned-Dependencies"] > span').should(
      "contain",
      "7/10",
    );
    cy.get('[data-testid="Pinned-Dependencies"] ~ h4').should(
      "contain",
      "Additional details / variations",
    );

    cy.get('[data-testid="SAST"]').should("contain", "SAST");
    cy.get('[data-testid="SAST"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="SAST"] > span').should("contain", "0/10");

    cy.get('[data-testid="Security-Policy"]').should(
      "contain",
      "Security-Policy",
    );
    cy.get('[data-testid="Security-Policy"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Security-Policy"] > span').should("contain", "10/10");

    cy.get('[data-testid="Signed-Releases"]').should(
      "contain",
      "Signed-Releases",
    );
    cy.get('[data-testid="Signed-Releases"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Signed-Releases"] > span').should("contain", "-1/10");

    cy.get('[data-testid="Token-Permissions"]').should(
      "contain",
      "Token-Permissions",
    );
    cy.get('[data-testid="Token-Permissions"] > div > span')
      .should("contain", "Unchanged")
      .and("have.css", "background-color")
      .and("eq", "rgb(108, 117, 125)");
    cy.get('[data-testid="Token-Permissions"] > span').should(
      "contain",
      "10/10",
    );
    cy.get('[data-testid="Token-Permissions"] ~ h4').should(
      "contain",
      "Additional details / variations",
    );

    cy.get('[data-testid="Vulnerabilities"]').should(
      "contain",
      "Vulnerabilities",
    );
    cy.get('[data-testid="Vulnerabilities"] > div > span')
      .should("contain", "Increased 2.7")
      .and("have.css", "background-color")
      .and("eq", "rgb(24, 135, 84)");
    cy.get('[data-testid="Vulnerabilities"] > span').should("contain", "10/10");
    cy.get('[data-testid="Vulnerabilities"] ~ h4').should(
      "contain",
      "Additional details / variations",
    );
  });
});
