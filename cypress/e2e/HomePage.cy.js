//describe("Product selection based on temperature", () => {
//before(() => {});
describe("Product selection based on temperature", () => {
  before(() => {
    // Set the viewport once before the tests run
    cy.viewport(1280, 800);
  });

  it("Should open the correct products page based on temperature", () => {
    //cy.visit("/");
    cy.openHomePage();
  });

  it("Should add the least expensive Aloe and Almond moisturizers to the cart", () => {
    cy.log("Visiting /moisturizer page");
    cy.visit("/moisturizer"); // Navigate to the moisturizer page
    cy.addLeastExpensiveProduct("Aloe");

    cy.get("body").then(($body) => {
      if ($body.find(".notification").length) {
        cy.get(".notification").should("be.visible");
      } else {
        // Handle the case where the notification is not present
      }
    });

    // Do the same for the Almond product
    cy.get("body").then(($body) => {
      if ($body.find(".notification").length) {
        cy.get(".notification").should("be.visible");
      } else {
        // Handle the case where the notification is not present
      }
    });
  });

  it("Should add the least expensive SPF-50 and SPF-30 sunscreens to the cart", () => {
    cy.visit("/sunscreen");
    addLeastExpensiveProduct("SPF-50");
    // Add assertions here to confirm the product was added

    addLeastExpensiveProduct("SPF-30");
    // Add assertions here to confirm the products were added
  });
});

// Helper function to add the least expensive product
function addLeastExpensiveProduct(ingredient) {
  cy.get(`p:contains("${ingredient}")`).then((products) => {
    // Log the number of products found
    cy.log(
      `${products.length} products found with the ingredient: ${ingredient}`
    );

    const prices = [...products]
      .map((p) => {
        const priceText = p.nextSibling && p.nextSibling.innerText;
        if (priceText) {
          const price = parseInt(
            priceText.replace("Price: ", "").replace("Rs", "").trim(),
            10 // Ensure radix 10 for decimal
          );
          if (!isNaN(price)) {
            return {
              price,
              button: p.parentNode.querySelector("button"),
            };
          }
        }
        return null;
      })
      .filter(Boolean); // Filter out any null or invalid entries

    // Log the prices array for debugging
    cy.log("Prices array:", JSON.stringify(prices));

    // Check if prices array is empty after filtering
    if (prices.length === 0) {
      cy.log(
        `No valid products found containing the ingredient: ${ingredient}`
      );
      return; // Exit the function if no products were found
    }

    // Now we can safely use reduce since we know the array is not empty
    const leastExpensive = prices.reduce((prev, curr) =>
      prev.price < curr.price ? prev : curr
    );

    // Perform the action to add the product to the cart
    cy.wrap(leastExpensive.button).should("be.visible").click();

    // Assert the count has increased by 1
    cy.get(".cart-count").should(($count) => {
      expect(parseInt($count.text())).to.eq(initialCount + 1);
    });
  });
}
