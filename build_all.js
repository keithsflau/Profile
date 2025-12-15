const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const apps = [];

// Helper to find apps
function findApps(basePath) {
    if (!fs.existsSync(basePath)) return;
    const dirs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());
    dirs.forEach(dir => {
        const appDir = path.join(basePath, dir);
        if (fs.existsSync(path.join(appDir, 'package.json'))) {
            apps.push(appDir);
        }
    });
}

// Locate all apps
findApps(path.join(rootDir, 'Secondary_School', 'Biology', 'apps'));
findApps(path.join(rootDir, 'Secondary_School', 'Music', 'apps'));

console.log(`Found ${apps.length} apps. Starting build process...`);

let successCount = 0;
let failCount = 0;

for (const appDir of apps) {
    const appName = path.basename(appDir);
    console.log(`\n--- Building ${appName} ---`);
    try {
        // Run install (lightweight check) and build
        // Using execSync to run sequentially
        // skipping npm i to save time if node_modules exists, but safer to try if missing
        if (!fs.existsSync(path.join(appDir, 'node_modules'))) {
            console.log(`Installing dependencies for ${appName}...`);
            execSync('npm install', { cwd: appDir, stdio: 'inherit' });
        }
        
        console.log(`Building ${appName}...`);
        execSync('npm run build', { cwd: appDir, stdio: 'inherit' });
        successCount++;
    } catch (error) {
        console.error(`Failed to build ${appName}:`, error.message);
        failCount++;
    }
}

console.log(`\nBuild Complete.`);
console.log(`Success: ${successCount}`);
console.log(`Failed: ${failCount}`);
