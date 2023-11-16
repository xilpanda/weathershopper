# Use the Cypress base image
FROM cypress/included:10.0.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the Cypress configuration and test files
COPY cypress.config.js .
COPY cypress/ cypress/

# Confirm the contents of the cypress directory
RUN ls -la /app/cypress

# Run Cypress tests
CMD ["npx", "cypress", "run"]