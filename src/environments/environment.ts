// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: 'U3VydGlBcHA6MzFhNWE1YjAxNDBlMDEzN2UwOGFhZGFhNjBlYjAxNmE0YjQzNDgxMg==',
  apiPath: 'IntranetSurti/WebServicesSurtiAppRest/',
  headerConfig: {
    headers: {
      'Authorization': `Basic U3VydGlBcHA6MzFhNWE1YjAxNDBlMDEzN2UwOGFhZGFhNjBlYjAxNmE0YjQzNDgxMg==`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
