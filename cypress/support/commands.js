// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to navigate to set the viewport,
//open the home page and correct product page based on temperature
Cypress.Commands.add("openHomePage", () => {
  cy.viewport(1280, 800);
  cy.visit("/");
  cy.get("#temperature")
    .invoke("text")
    .then((tempText) => {
      const temperature = parseInt(tempText.split(" ")[0]);
      if (temperature < 19) {
        cy.get("button").contains("Buy moisturizers").click();
        cy.url().should("include", "/moisturizer");
      } else if (temperature > 34) {
        cy.get("button").contains("Buy sunscreens").click();
        cy.url().should("include", "/sunscreen");
      }
    });
});

Cypress.Commands.add("addLeastExpensiveProduct", (ingredient) => {
  cy.log(`Finding products with ingredient: ${ingredient}`);
  cy.get(`p:contains("${ingredient}")`).then((products) => {
    cy.log(`${products.length} products found with ingredient: ${ingredient}`);
  });
});

// Add stripe checkout
// Cypress.Commands.add("handlePaymentInIframe", () => {
//   cy.get("iframe.stripe_checkout_app", { timeout: 3000 }).then(($iframe) => {
//     const body = $iframe.contents().find("body");
//   });
// });

Cypress.Commands.add("addLeastExpensiveSunscreen", (SPF) => {
  cy.visit("/sunscreen");
  cy.wait(3000); // Increase wait time for dynamic content

  // Navigate to the cart page
  cy.get("button").contains("Cart").click();

  // Proceed to checkout
  cy.get("button").contains("Pay with Card").click();
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
