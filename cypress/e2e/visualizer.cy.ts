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

  it.todo("should render error when the commit hash does not exist", () => {});
  it.todo(
    "should render a valid scoredata visualization for the latest reported commit",
    () => {}
  );
  it.todo(
    "should render a valid scoredata visualization for an specific reported commit",
    () => {}
  );
});
