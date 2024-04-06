import fs from 'fs';
import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchAndStoreEncryptedPassword = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/soda-clubbing/website-content/contents/password.txt', {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch password.txt: ${response.statusText}`);
        }

        const data = await response.json();
        const passwordPlainText = Buffer.from(data.content, 'base64').toString('utf8').trim();

        // Encrypt the password using SHA-256
        const encryptedPassword = CryptoJS.SHA256(passwordPlainText).toString(CryptoJS.enc.Hex);

        // Store the encrypted password in a TypeScript file
        const tsContent = `
        export const encryptedPassword = "${encryptedPassword}";
        `;

        fs.writeFileSync('./src/logic/encryptedPassword.ts', tsContent);
        console.log(`Encrypted password has been stored successfully.`);
    } catch (error) {
        console.error(`Error fetching or storing the encrypted password: ${error.message}`);
    }
};

fetchAndStoreEncryptedPassword();