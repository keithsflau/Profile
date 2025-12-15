const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const apps = [];

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

findApps(path.join(rootDir, 'Secondary_School', 'Biology', 'apps'));
findApps(path.join(rootDir, 'Secondary_School', 'Music', 'apps'));

const v3Tailwind = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const v3Postcss = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

console.log(`Checking ${apps.length} apps for Tailwind v4 syntax...`);

apps.forEach(appDir => {
    // 1. Fix src/index.css
    const cssPath = path.join(appDir, 'src', 'index.css');
    if (fs.existsSync(cssPath)) {
        let content = fs.readFileSync(cssPath, 'utf-8');
        if (content.includes('@import "tailwindcss"')) {
            console.log(`Fixing CSS in ${path.basename(appDir)}`);
            // Replace the import with v3 directives
            // We assume the import is at the top or near it.
            // But we can just replace the specific string.
            // However, v4 syntax replaces ALL 3 directives with one import.
            content = content.replace(/@import "tailwindcss";?/, v3Tailwind);
            fs.writeFileSync(cssPath, content);
        }
    }

    // 2. Fix postcss.config.js
    const postcssPath = path.join(appDir, 'postcss.config.js');
    if (fs.existsSync(postcssPath)) {
        let content = fs.readFileSync(postcssPath, 'utf-8');
        if (content.includes('@tailwindcss/postcss')) {
            console.log(`Fixing PostCSS config in ${path.basename(appDir)}`);
            fs.writeFileSync(postcssPath, v3Postcss);
        }
    }
});
