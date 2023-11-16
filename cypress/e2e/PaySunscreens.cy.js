// Add this to your test file

describe("Product selection based on temperature for Sunscreens", () => {
  before(() => {
    cy.viewport(1280, 800);
    cy.visit("/");
  });

  it("Should add the least expensive SPF-30 and SPF-50 sunscreens to the cart and complete the purchase", () => {
    // Check the temperature on the homepage
    cy.get("#temperature").then(($temp) => {
      const temperature = parseInt($temp.text().split(" ")[0]);

      if (temperature > 34) {
        // Add the least expensive sunscreens with SPF-30 and SPF-50
        cy.addLeastExpensiveSunscreen("SPF-30");
        cy.addLeastExpensiveSunscreen("SPF-50");
      }
    });
  });
});
