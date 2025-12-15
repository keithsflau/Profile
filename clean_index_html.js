const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const apps = [];

function findApps(basePath) {
    if (!fs.existsSync(basePath)) return;
    const dirs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory());
    dirs.forEach(dir => {
        const appDir = path.join(basePath, dir);
        if (fs.existsSync(path.join(appDir, 'index.html'))) {
            apps.push(path.join(appDir, 'index.html'));
        }
    });
}

findApps(path.join(rootDir, 'Secondary_School', 'Biology', 'apps'));
findApps(path.join(rootDir, 'Secondary_School', 'Music', 'apps'));

console.log(`Processing ${apps.length} index.html files...`);

apps.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Remove CSS link
    content = content.replace(/<link rel="stylesheet" href="[^"]*visit-counter\.css">/g, '');

    // Remove container div
    content = content.replace(/<div id="visit-counter-container"><\/div>/g, '');
    
    // Remove script tag
    content = content.replace(/<script src="[^"]*visit-counter\.js"><\/script>/g, '');

    // Remove inline script block
    // Matches <script> ... VisitCounter ... </script>
    // Using a simpler approach: remove the specific block I saw
    const scriptBlockRegex = /<script>\s*const SCRIPT_URL =[\s\S]*?VisitCounter\.init[\s\S]*?<\/script>/g;
    content = content.replace(scriptBlockRegex, '');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned ${filePath}`);
    }
});
