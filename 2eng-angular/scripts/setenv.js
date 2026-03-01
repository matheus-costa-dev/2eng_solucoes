const { writeFile } = require('fs');

// Configure dotenv
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const targetPath = isProduction
    ? `./src/environments/environment.ts`
    : `./src/environments/environment.ts`; // for now we write to environment.ts

if (!process.env.HYGRAPH_ENDPOINT || !process.env.HYGRAPH_TOKEN) {
    console.error('All the required environment variables were not provided! (HYGRAPH_ENDPOINT, HYGRAPH_TOKEN)');
    process.exit(-1);
}

const environmentFileContent = `export const environment = {
  production: ${isProduction},
  hygraphEndpoint: '${process.env.HYGRAPH_ENDPOINT}',
  hygraphToken: '${process.env.HYGRAPH_TOKEN}'
};
`;

// escreve no console a saida
console.log('Writing environment.ts with actual .env vars...');

writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('environment.ts generated successfully!');
});
