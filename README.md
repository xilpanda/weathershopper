# End-to-end tests for the [https://weathershopper.pythonanywhere.com/](https://weathershopper.pythonanywhere.com/)

## Installing dependencies

How to install dependencies:

```
npm install
```

## Running the project

How to run the tests:

```
npx cypress run
```

How to run the tests with open browser:

```
npx cypress open
```

Or you can run a pre-defined script with the command

```
npm run test
```

or

```
npm run open
```

Tests within a Docker container

```
docker build -t your-image-name .
```

```
docker run --rm your-image-name
```
