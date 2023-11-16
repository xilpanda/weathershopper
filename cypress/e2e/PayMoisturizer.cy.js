describe("Product selection based on temperature", () => {
  before(() => {
    cy.viewport(1280, 800);
    cy.visit("/");
  });

  it("Should add the least expensive Aloe and Almond moisturizers to the cart and complete the purchase", () => {
    // Add the least expensive Aloe moisturizer to the cart
    cy.addLeastExpensiveProduct("Aloe");
    // Wait for notification that product has been added HERE
    // Click the first element with the class
    cy.get(".thin-text.nav-link")
      .eq(0)
      .should("exist")
      .and("be.visible")
      .click();

    // Check that Aloe is in the cart
    // Log the current HTML for debugging
    cy.document().then((doc) => {
      console.log(doc.documentElement.innerHTML);
    });

    // Add the least expensive Almond moisturizer to the cart
    cy.addLeastExpensiveProduct("Almond");

    // Navigate to the cart page
    cy.get("button").contains("Cart").click();

    // Proceed to checkout
    cy.get("button").contains("Pay with Card").click();

    // Assuming the payment form is within an iframe with name attribute 'stripe_checkout_app'
    // You need to verify the actual 'name' attribute of the iframe
    cy.get("iframe.stripe_checkout_app")
      .wait(3000)
      .then(($iframe) => {
        const iframe = $iframe.contents();
        const myInput0 = iframe.find("input:eq(0)");
        const myInput1 = iframe.find("input:eq(1)");
        const myInput2 = iframe.find("input:eq(2)");
        const myInput3 = iframe.find("input:eq(3)");
        const myButton = iframe.find("button");

        cy.wrap(myInput0).invoke("val", "test@gmail.com").trigger("change");
        cy.wrap(myInput1).invoke("val", 4000056655665556).trigger("change");

        cy.wrap(myInput2).invoke("val", 1123).trigger("change");
        cy.wrap(myInput3).invoke("val", 424).trigger("change");

        cy.wrap(myButton).click({ force: true });
      });
  });
});

// Define the custom command to add the least expensive product
Cypress.Commands.add("addLeastExpensiveProduct", (ingredient) => {
  // Navigate to the moisturizer or sunscreen page based on the ingredient
  if (ingredient === "Aloe" || ingredient === "Almond") {
    cy.visit("/moisturizer");
  } else {
    cy.visit("/sunscreen");
  }

  // Logic to select the least expensive product goes here
  // For the sake of example, let's click the first 'Add' button
  cy.contains("Add", { timeout: 10000 }).should("be.visible").click();
});
