## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Set PORT environment variable = 5000. Then, Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) with
your browser to see swagger documentation.

Or [Click here](https://vai-api.fixerloop.com/api-docs) to visit the swagger docs online.

## Tech-Stack

- This project is developed with NodeJS and ExpressJs framework.

- The used libraries are the following:

| Library             | Description                                              | Link                                              |
|---------------------|----------------------------------------------------------|---------------------------------------------------|
| bcryptjs            | Hash passwords.                                          | https://github.com/dcodeIO/bcrypt.js              |
| typegoose           | Creating mongodb models based on classes and decorators. | https://github.com/typegoose/typegoose            |
| jsonwebtoken        | Creating token after authentication.                     | https://github.com/auth0/node-jsonwebtoken        |
| routing-controllers | Creating api routes and controllers using decorators.    | https://github.com/typestack/routing-controllers  |
| typedi              | Creating services and inject them into the controllers.  | https://github.com/typestack/typedi               |
| swagger-ui-express  | Creating the api documentation                           | https://github.com/scottie1984/swagger-ui-express |

## Deployment

- This application is deployed on AWS beanstalk using the AWS code pipeline.
- The `buildspec.yml` and `Procfile` files below the project root are used to build and deploy the application in the
  AWS Cloud Service.

| file          | Password                                                           |
|---------------|--------------------------------------------------------------------|
| buildspec.yml | The main file that will be used to build the project on the cloud. |
| Procfile      | used to update the start command of the beanstalk service.         |
