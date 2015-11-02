export function getDocumentation(opts: { libraryName: string; }) {
    return '' +
`/* 
 * Automatically generated code on ${new Date().toString()}. Do not edit this file.
 * 
 * To use, ensure the following:
 *
 * 1. That this code is copied into the application that is going to use the server.
 * 2. That ${opts.libraryName} is added as a dependency in the application. Install it by running:
 *
 *    npm install --save ${opts.libraryName}
 *
 * 3. Include the typescript definition file for ${opts.libraryName} in your application. 
 *    You can easily add it by running...
 *
 *    tsd link 
 *
 *    ...if you are using tsd (http://definitelytyped.org/tsd/)
 *
 * 4. That the import paths in this file are correct. If they aren't, change the code
 *    generation script to generate the correct paths.
 */
`;
}