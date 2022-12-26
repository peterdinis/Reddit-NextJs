describe("Visit our reddit page", () => {
  it("Visit homepage for our reddit clone", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("Visit our 404 page", () => {
  it("Go to page which does not exists", () => {
    cy.visit("http://localhost:3000/notExists");
  });
});
