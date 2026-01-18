// Clean up any old wrangler deploy configs before deploying
const fs = require('fs');
const path = require('path');

const wranglerDeployConfig = path.join('.wrangler', 'deploy', 'config.json');
if (fs.existsSync(wranglerDeployConfig)) {
  fs.unlinkSync(wranglerDeployConfig);
  console.log('Deleted stale .wrangler/deploy/config.json');
} else {
  console.log('No stale wrangler deploy config found.');
}
