// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: '86ykg7fe4magrl',
  clientSecret: '9WRk82y2qSNdOKej',
  redirect_uri: 'https://localhost:4200/applicant/dashboard',
  scope: ['openid', 'profile', 'email' ],
  authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  accessTokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
  // apiUrl: 'http://85.10.211.132/soletech.api/api'
  apiUrl: 'http://localhost:7247/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
