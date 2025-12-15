const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = __dirname;
const skippedDirs = [
  "node_modules",
  ".git",
  ".github",
  "dist",
  "build",
  "public",
];

function findPackageJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (skippedDirs.includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findPackageJsonFiles(filePath, fileList);
    } else if (file === "package.json") {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function buildApp(packageJsonPath) {
  const dir = path.dirname(packageJsonPath);
  console.log(`Checking ${dir}...`);

  const distPath = path.join(dir, "dist");
  // Check if dist exists and has index.html
  if (
    fs.existsSync(distPath) &&
    fs.existsSync(path.join(distPath, "index.html"))
  ) {
    console.log(`  - Already built: ${distPath}`);
    return;
  }

  console.log(`  - Building ${dir}...`);
  try {
    // Check if node_modules exists
    if (!fs.existsSync(path.join(dir, "node_modules"))) {
      console.log("    - Installing dependencies...");
      execSync("npm install --silent", { cwd: dir, stdio: "inherit" });
    }

    console.log("    - Running build...");
    execSync("npm run build", { cwd: dir, stdio: "inherit" });
    console.log("    - Build successful!");
  } catch (error) {
    console.error(`    - Build FAILED for ${dir}:`, error.message);
  }
}

const packageJsonFiles = findPackageJsonFiles(rootDir);
console.log(`Found ${packageJsonFiles.length} package.json files.`);

for (const pkg of packageJsonFiles) {
  // Skip the root package.json if it exists (usually just for scripts)
  // But check if it has a build script first.
  // Actually, usually app package.json are in subdirs.
  if (path.dirname(pkg) === rootDir) continue;

  // Also skip if it is inside node_modules (double check)
  if (pkg.includes("node_modules")) continue;

  buildApp(pkg);
}
