// Clean up stale wrangler deploy configs (CommonJS)
const fs = require('fs');
const path = require('path');

const wranglerDeployDir = path.join(__dirname, '../.wrangler/deploy');
if (fs.existsSync(wranglerDeployDir)) {
  fs.rmSync(wranglerDeployDir, { recursive: true, force: true });
  console.log('Removed stale .wrangler/deploy directory.');
} else {
  console.log('.wrangler/deploy directory does not exist.');
}
