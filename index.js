const https = require('node:https');
const { URL } = require('node:url');

const fetchTitle = (url) => {
    const parsedUrl = new URL(url);
    https.get(parsedUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const titleMatch = data.match(/<title>(.*?)<\/title>/);
            if (titleMatch) {
                console.log(titleMatch[1]);
            } else {
                console.error('Title tag not found.');
            }
        });
    }).on('error', (err) => {
        console.error('Error fetching the URL:', err.message);
    });
};

const url = process.argv[2];
if (!url) {
    console.error('Please provide a URL as the first argument.');
    process.exit(1);
}

fetchTitle(url);