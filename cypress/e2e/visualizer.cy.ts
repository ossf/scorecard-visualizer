describe("Visualizer", () => {
  it("should render error when organization or repository does not exist", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node",
      {
        statusCode: 404,
      }
    ).as("getData");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node"
    );
    cy.wait("@getData"); // first try as react query behaves
    cy.wait("@getData"); // second try
    cy.wait("@getData"); // third try
    cy.get("h1", { timeout: 10000 }).should(
      "contain",
      "An error ocurred. Please refresh/try again."
    );
    cy.get("p", { timeout: 10000 }).should(
      "contain",
      "Please check if the org/repository/commit has been analysed by the Scorecard."
    );
  });

  it("should render error when the commit hash does not exist", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=19fa9f1bc47b0666be0747583bea8cb3d8ad5eb1",
      {
        statusCode: 404,
      }
    ).as("getData");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node/commit/19fa9f1bc47b0666be0747583bea8cb3d8ad5eb1"
    );
    cy.wait("@getData"); // first try as react query behaves
    cy.wait("@getData"); // second try
    cy.wait("@getData"); // third try
    cy.get("h1", { timeout: 10000 }).should(
      "contain",
      "An error ocurred. Please refresh/try again."
    );
    cy.get("p", { timeout: 10000 }).should(
      "contain",
      "Please check if the org/repository/commit has been analysed by the Scorecard."
    );
  });

  it("should render a valid scoredata visualization for the latest reported commit", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node",
      {
        statusCode: 200,
        fixture: "50477fa35367bb76e5f56ac93d661b01a5578cec.json",
      }
    ).as("getData");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node"
    );
    cy.wait("@getData");
    cy.get("h1").should("contain", "OpenSSF Scorecard for nodejs/node");

    cy.get("h2").should("contain", "Score: 7.3/10");

    cy.get('[data-testid="date"]').should("contain", "Date: July 2, 2023");

    cy.get('[data-testid="scorecard-version"]').should(
      "contain",
      "Scorecard version v4.10.5 (27cfe92e)"
    );
    cy.get('[data-testid="scorecard-version"] > a')
      .should("contain", "(27cfe92e)")
      .and("have.attr", "href")
      .and(
        "include",
        "https://github.com/ossf/scorecard/commit/27cfe92ed356fdb5a398c919ad480817ea907808"
      );

    cy.get('[data-testid="current-commit"]').should(
      "contain",
      "Current commit (50477fa3)"
    );
    cy.get('[data-testid="current-commit"] > a')
      .should("contain", "(50477fa3)")
      .and("have.attr", "href")
      .and(
        "include",
        "https://github.com/nodejs/node/commit/50477fa35367bb76e5f56ac93d661b01a5578cec"
      );

    cy.get('[data-testid="deps-dev"]').should(
      "contain",
      "Additional info at deps.dev"
    );
    cy.get('[data-testid="deps-dev"] > a')
      .should("contain", "deps.dev")
      .and("have.attr", "href")
      .and("include", "https://deps.dev/project/github/nodejs%2Fnode");

    cy.get('[data-testid="step-security"]').should(
      "contain",
      "Improve your scoring with StepSecurity"
    );
    cy.get('[data-testid="step-security"] > a')
      .should("contain", "StepSecurity")
      .and("have.attr", "href")
      .and(
        "include",
        "https://app.stepsecurity.io/securerepo?repo=nodejs/node"
      );

    cy.get('[data-testid="Binary-Artifacts"]')
      .should("contain", "Binary-Artifacts")
      .and("contain", "0/10");
    cy.get('[data-testid="Branch-Protection"]')
      .should("contain", "Branch-Protection")
      .and("contain", "-1/10");
    cy.get('[data-testid="CI-Tests"]')
      .should("contain", "CI-Tests")
      .and("contain", "9/10");
    cy.get('[data-testid="CII-Best-Practices"]')
      .should("contain", "CII-Best-Practices")
      .and("contain", "5/10");
    cy.get('[data-testid="Code-Review"]')
      .should("contain", "Code-Review")
      .and("contain", "0/10");
    cy.get('[data-testid="Contributors"]')
      .should("contain", "Contributors")
      .and("contain", "10/10");
    cy.get('[data-testid="Dangerous-Workflow"]')
      .should("contain", "Dangerous-Workflow")
      .and("contain", "10/10");
    cy.get('[data-testid="Dependency-Update-Tool"]')
      .should("contain", "Dependency-Update-Tool")
      .and("contain", "10/10");
    cy.get('[data-testid="Fuzzing"]')
      .should("contain", "Fuzzing")
      .and("contain", "10/10");
    cy.get('[data-testid="License"]')
      .should("contain", "License")
      .and("contain", "9/10");
    cy.get('[data-testid="Maintained"]')
      .should("contain", "Maintained")
      .and("contain", "10/10");
    cy.get('[data-testid="Packaging"]')
      .should("contain", "Packaging")
      .and("contain", "-1/10");
    cy.get('[data-testid="Pinned-Dependencies"]')
      .should("contain", "Pinned-Dependencies")
      .and("contain", "7/10");
    cy.get('[data-testid="SAST"]')
      .should("contain", "SAST")
      .and("contain", "0/10");
    cy.get('[data-testid="Security-Policy"]')
      .should("contain", "Security-Policy")
      .and("contain", "10/10");
    cy.get('[data-testid="Signed-Releases"]')
      .should("contain", "Signed-Releases")
      .and("contain", "-1/10");
    cy.get('[data-testid="Token-Permissions"]')
      .should("contain", "Token-Permissions")
      .and("contain", "10/10");
    cy.get('[data-testid="Vulnerabilities"]')
      .should("contain", "Vulnerabilities")
      .and("contain", "10/10");
  });
  it("should render a valid scoredata visualization for an specific reported commit", () => {
    cy.intercept(
      "GET",
      "https://api.securityscorecards.dev/projects/github.com/nodejs/node/?commit=50477fa35367bb76e5f56ac93d661b01a5578cec",
      {
        statusCode: 200,
        fixture: "50477fa35367bb76e5f56ac93d661b01a5578cec.json",
      }
    ).as("getData");

    cy.visit(
      "localhost:3000/openssf-scorecard-api-visualizer/#/projects/github.com/nodejs/node/commit/50477fa35367bb76e5f56ac93d661b01a5578cec"
    );
    cy.wait("@getData");
    cy.get("h1").should("contain", "OpenSSF Scorecard for nodejs/node");

    cy.get("h2").should("contain", "Score: 7.3/10");

    cy.get('[data-testid="date"]').should("contain", "Date: July 2, 2023");

    cy.get('[data-testid="scorecard-version"]').should(
      "contain",
      "Scorecard version v4.10.5 (27cfe92e)"
    );
    cy.get('[data-testid="scorecard-version"] > a')
      .should("contain", "(27cfe92e)")
      .and("have.attr", "href")
      .and(
        "include",
        "https://github.com/ossf/scorecard/commit/27cfe92ed356fdb5a398c919ad480817ea907808"
      );

    cy.get('[data-testid="current-commit"]').should(
      "contain",
      "Current commit (50477fa3)"
    );
    cy.get('[data-testid="current-commit"] > a')
      .should("contain", "(50477fa3)")
      .and("have.attr", "href")
      .and(
        "include",
        "https://github.com/nodejs/node/commit/50477fa35367bb76e5f56ac93d661b01a5578cec"
      );

    cy.get('[data-testid="deps-dev"]').should(
      "contain",
      "Additional info at deps.dev"
    );
    cy.get('[data-testid="deps-dev"] > a')
      .should("contain", "deps.dev")
      .and("have.attr", "href")
      .and("include", "https://deps.dev/project/github/nodejs%2Fnode");

    cy.get('[data-testid="step-security"]').should(
      "contain",
      "Improve your scoring with StepSecurity"
    );
    cy.get('[data-testid="step-security"] > a')
      .should("contain", "StepSecurity")
      .and("have.attr", "href")
      .and(
        "include",
        "https://app.stepsecurity.io/securerepo?repo=nodejs/node"
      );

    cy.get('[data-testid="Binary-Artifacts"]')
      .should("contain", "Binary-Artifacts")
      .and("contain", "0/10");
    cy.get('[data-testid="Branch-Protection"]')
      .should("contain", "Branch-Protection")
      .and("contain", "-1/10");
    cy.get('[data-testid="CI-Tests"]')
      .should("contain", "CI-Tests")
      .and("contain", "9/10");
    cy.get('[data-testid="CII-Best-Practices"]')
      .should("contain", "CII-Best-Practices")
      .and("contain", "5/10");
    cy.get('[data-testid="Code-Review"]')
      .should("contain", "Code-Review")
      .and("contain", "0/10");
    cy.get('[data-testid="Contributors"]')
      .should("contain", "Contributors")
      .and("contain", "10/10");
    cy.get('[data-testid="Dangerous-Workflow"]')
      .should("contain", "Dangerous-Workflow")
      .and("contain", "10/10");
    cy.get('[data-testid="Dependency-Update-Tool"]')
      .should("contain", "Dependency-Update-Tool")
      .and("contain", "10/10");
    cy.get('[data-testid="Fuzzing"]')
      .should("contain", "Fuzzing")
      .and("contain", "10/10");
    cy.get('[data-testid="License"]')
      .should("contain", "License")
      .and("contain", "9/10");
    cy.get('[data-testid="Maintained"]')
      .should("contain", "Maintained")
      .and("contain", "10/10");
    cy.get('[data-testid="Packaging"]')
      .should("contain", "Packaging")
      .and("contain", "-1/10");
    cy.get('[data-testid="Pinned-Dependencies"]')
      .should("contain", "Pinned-Dependencies")
      .and("contain", "7/10");
    cy.get('[data-testid="SAST"]')
      .should("contain", "SAST")
      .and("contain", "0/10");
    cy.get('[data-testid="Security-Policy"]')
      .should("contain", "Security-Policy")
      .and("contain", "10/10");
    cy.get('[data-testid="Signed-Releases"]')
      .should("contain", "Signed-Releases")
      .and("contain", "-1/10");
    cy.get('[data-testid="Token-Permissions"]')
      .should("contain", "Token-Permissions")
      .and("contain", "10/10");
    cy.get('[data-testid="Vulnerabilities"]')
      .should("contain", "Vulnerabilities")
      .and("contain", "10/10");
  });
});
