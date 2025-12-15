const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const basePath = path.join(__dirname, "Secondary_School/Biology/apps");

const apps = fs.readdirSync(basePath).filter((f) => {
  const stat = fs.statSync(path.join(basePath, f));
  return (
    stat.isDirectory() && fs.existsSync(path.join(basePath, f, "package.json"))
  );
});

let successCount = 0;
let failCount = 0;
const results = [];

for (const appName of apps) {
  const appDir = path.join(basePath, appName);
  try {
    execSync("npm run build", { cwd: appDir, stdio: "pipe" });
    results.push(`OK: ${appName}`);
    successCount++;
  } catch {
    results.push(`FAIL: ${appName}`);
    failCount++;
  }
}

console.log(`Success: ${successCount}/${apps.length}`);
console.log(`Failed: ${failCount}`);
console.log("");
results.forEach((r) => console.log(r));
