// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientRoot: 'http://localhost:4200/',

  //apiRoot: 'https://securingangularappscoursev2-api.azurewebsites.net/api/',
  //stsAuthority: 'https://securingangularappscoursev2-sts.azurewebsites.net/',
  //clientId: 'spa-client',

  apiRoot: 'https://securingangularappscoursev2-api.azurewebsites.net/api/',
  stsAuthority: 'https://localhost:44300/',
  clientId: 'client_id',
  
  
  issuer: 'http://localhost:44300/',
  authorizationEndpoint: 'https://localhost:44300/connect/token',
  tokenEndpoint: 'https://localhost:44300/connect/token',
  jwksUri: 'https://localhost:44300/.well-known/jwks',
  userinfoEndpoint: 'https://localhost:44300/userinfo'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
