const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// Load credentials
const credentialsPath = path.join(__dirname, '..', 'google-credentials.json');
if (!fs.existsSync(credentialsPath)) {
  console.error('Error: google-credentials.json not found in the project root.');
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// Helper to URL-safe base64 encode
function base64url(str, encoding = 'utf8') {
  return Buffer.from(str, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Generate JWT token for Google OAuth
function generateJWT() {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: creds.private_key_id
  };

  const payload = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: creds.token_uri,
    exp: exp,
    iat: iat
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const input = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(input);
  const signature = base64url(signer.sign(creds.private_key));

  return `${input}.${signature}`;
}

// Get Access Token from Google
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const jwt = generateJWT();
    const postData = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    }).toString();

    const options = {
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to get token: ${res.statusCode} - ${body}`));
          return;
        }
        resolve(JSON.parse(body).access_token);
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Publish URL to Google Indexing API
function publishUrl(accessToken, targetUrl, type = 'URL_UPDATED') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: targetUrl,
      type: type
    });

    const options = {
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Indexing API error: ${res.statusCode} - ${body}`));
          return;
        }
        resolve(JSON.parse(body));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// CLI Execution
const targetUrl = process.argv[2];
if (!targetUrl) {
  console.log('Usage: node scripts/index-url.cjs <url>');
  process.exit(1);
}

console.log(`Authenticating and indexing: ${targetUrl}...`);
getAccessToken()
  .then(token => publishUrl(token, targetUrl))
  .then(result => {
    console.log('Successfully notified Google Indexing API!');
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error('Error during indexing execution:', err.message);
    process.exit(1);
  });
