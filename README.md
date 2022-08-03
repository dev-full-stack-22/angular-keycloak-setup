# DemoUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## The below resource was used for building the keycload integration with Angular
https://www.youtube.com/watch?v=QV5YtczsorY

## Additional Fixes
**Issue with redirect url**

[https://github.com/keycloak/keycloak/issues/10528](https://github.com/keycloak/keycloak/issues/10528)

The provided redirect url does not match with the redirect url mentioned in the Auth Server

type=LOGIN_ERROR, realmId=0320ffe1-4777-4867-a25b-f5501af1b7b6, clientId=springboot-microservice, userId=null, ipAddress=172.17.0.1, error=not_allowed, response_type='id_token token', redirect_uri=http://localhost:4200, response_mode=fragment

**CORS issue resolution**

Web Origins set to * for testing. In production to be set to the valid list of origin points.

**Added a Http Interceptor for adding access token when present**

[https://www.javatpoint.com/angular-http-interceptor#:~:text=To use the same instance,a lazy-loading module](https://www.javatpoint.com/angular-http-interceptor#:~:text=To%20use%20the%20same%20instance,a%20lazy%2Dloading%20module)).


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

