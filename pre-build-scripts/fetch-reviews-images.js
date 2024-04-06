import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper function to create directories recursively
const createDirRecursively = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Helper function to download and save an image
const downloadAndSaveImage = async (file, localDir) => {
    try {
        const imageResponse = await fetch(file.download_url, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if (!imageResponse.ok) {
            throw new Error(`Failed to download image ${file.name}: ${imageResponse.statusText}`);
        }

        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(path.join(localDir, file.name), buffer);
        console.log(`Downloaded and stored ${file.name} in ${localDir}`);
    } catch (error) {
        console.error(`Error downloading image ${file.name}: ${error.message}`);
    }
};

// Recursive function to fetch all directories and files under a given path
const fetchAndStoreImagesRecursively = async (repoPath, localPath) => {
    const repoUrl = `https://api.github.com/repos/soda-clubbing/website-content/contents/${repoPath}`;

    try {
        const response = await fetch(repoUrl, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${repoPath}: ${response.statusText}`);
        }

        const data = await response.json();

        for (const file of data) {
            // Store images under public so Next.js can serve them statically
            const localDir = path.join('./public/remote-images', localPath);

            if (file.type === 'file') {
                // Create the directory if it doesn't exist
                createDirRecursively(localDir);

                // Download and save the image
                await downloadAndSaveImage(file, localDir);
            } else if (file.type === 'dir') {
                // Recursively fetch and store images in the subdirectory
                await fetchAndStoreImagesRecursively(`${repoPath}/${file.name}`, `${localPath}/${file.name}`);
            }
        }
    } catch (error) {
        console.error(`Error fetching or storing images from ${repoPath}: ${error.message}`);
    }
};

const fetchAndStoreImages = async () => {
    await fetchAndStoreImagesRecursively('images', ''); // Start from the root of the "images" directory
};

fetchAndStoreImages();
