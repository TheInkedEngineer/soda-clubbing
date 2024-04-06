import fs from 'fs';
import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchAndStoreTranslations = async () => {
    const languages = ['en', 'it'];
    const pages = ['apply-page', 'rules-page', 'header', 'about-page', 'home-page', 'security-page', 'faq-page', 'review-page', 'party-admission-page'];

    for (const lang of languages) {
        for (const page of pages) {
            try {
                const response = await fetch(`https://api.github.com/repos/soda-clubbing/website-content/contents/text/${page}/${lang}.json`, {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${page} for ${lang}: ${response.statusText}`);
                }
                const data = await response.json();
                const fileContent = Buffer.from(data.content, 'base64').toString('utf8');

                const dir = `./src/translations/${page}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFileSync(`${dir}/${lang}.json`, fileContent);
                console.log(`Fetched and stored ${page} for ${lang}`);
            } catch (error) {
                console.error(error.message);
            }
        }
    }
};

fetchAndStoreTranslations();