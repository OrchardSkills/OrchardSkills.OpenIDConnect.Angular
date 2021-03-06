export const environment = {
  production: true,
  clientRoot: 'https://localhost:4200/',

  //apiRoot: 'https://securingangularappscoursev2-api.azurewebsites.net/api/',
  //stsAuthority: 'https://securingangularappscoursev2-sts.azurewebsites.net/',
  //clientId: 'spa-client',

  apiRoot: 'https://securingangularappscoursev2-api.azurewebsites.net/api/',
  stsAuthority: 'https://localhost:44300/',
  clientId: 'client_id',

  issuer: 'https://localhost:44300/',
  authorizationEndpoint: 'https://localhost:44300/connect/token',
  tokenEndpoint: 'https://localhost:44300/connect/token',
  jwksUri: 'https://localhost:44300/.well-known/jwks',
  userinfoEndpoint: 'https://localhost:44300/userinfo'  
};
