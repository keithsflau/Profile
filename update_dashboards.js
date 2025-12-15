const fs = require("fs");
const path = require("path");

// Configuration
const dashboards = [
  {
    name: "Biology",
    path: "Secondary_School/Biology/index.html",
    appsDir: "Secondary_School/Biology/apps",
    prefix: "apps/",
  },
  {
    name: "Physics",
    path: "Secondary_School/Physics/index.html",
    appsDir: "Secondary_School/Physics",
    prefix: "",
  },
  {
    name: "Mathematics",
    path: "Secondary_School/Mathematics/index.html",
    appsDir: "Secondary_School/Mathematics",
    prefix: "",
  },
  {
    name: "Junior Science",
    path: "Secondary_School/Junior Science/index.html",
    appsDir: "Secondary_School/Junior Science",
    prefix: "",
  },
  {
    name: "Economy",
    path: "Secondary_School/Economy/index.html",
    appsDir: "Secondary_School/Economy",
    prefix: "",
  },
  {
    name: "Secondary Chinese",
    path: "Secondary_School/Chinese/index.html",
    appsDir: "Secondary_School/Chinese",
    prefix: "",
  },
  {
    name: "Primary Chinese",
    path: "Primary_School/PrimaryChinese/index.html",
    appsDir: "Primary_School/PrimaryChinese",
    prefix: "",
  },
];

const rootDir = __dirname;
const skippedDirs = [
  "node_modules",
  ".git",
  ".github",
  "dist",
  "build",
  "public",
  "assets",
];
const skippedFiles = ["index.html", "visit-counter.js", "visit-counter.css"];

// Helper to determine text color class based on category
function getColorClass(category) {
  const map = {
    Biology: "emerald",
    Physics: "blue",
    Mathematics: "red",
    "Junior Science": "teal",
    Economy: "yellow",
    "Secondary Chinese": "red",
    "Primary Chinese": "orange",
  };
  return map[category] || "indigo";
}

function generateCard(appName, appPath, category) {
  const color = getColorClass(category);
  // Simple formatting for title
  const title = appName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return `
                        <!-- Card: ${title} -->
                        <a href="${appPath}"
                            class="glass-card rounded-2xl p-6 hover:bg-white/90 group flex flex-col">
                            <div
                                class="mb-4 w-12 h-12 rounded-xl bg-${color}-100 text-${color}-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3
                                class="text-lg font-semibold mb-2 text-slate-900 group-hover:text-${color}-600 transition-colors">
                                ${title}
                            </h3>
                            <p class="text-sm text-slate-600 flex-grow">
                                Interactive learning application.
                            </p>
                            <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span class="text-xs font-medium text-${color}-600 bg-${color}-50 px-2 py-1 rounded">${category}</span>
                                <span class="text-xs text-slate-400">Launch →</span>
                            </div>
                        </a>`;
}

function updateDashboard(config) {
  const dashboardPath = path.join(rootDir, config.path);
  const appsDirPath = path.join(rootDir, config.appsDir);

  if (!fs.existsSync(dashboardPath)) {
    console.log(`Warning: Dashboard not found at ${config.path}`);
    return;
  }
  if (!fs.existsSync(appsDirPath)) {
    console.log(`Warning: Apps directory not found at ${config.appsDir}`);
    return;
  }

  let htmlContent = fs.readFileSync(dashboardPath, "utf8");
  const apps = fs.readdirSync(appsDirPath);

  let addedCount = 0;

  // Find the grid container to inject into.
  // Heuristic: Look for class containing "grid" and "sm:grid-cols-2"
  // Or just append before the closing div of the main grid.
  // Easier: Find a known marker or the end of the last card.
  // The previous editing inserted before the last card.
  // Let's perform a simple check: does the HTML contain the link?

  const newCards = [];

  for (const app of apps) {
    if (skippedDirs.includes(app) || app.startsWith(".")) continue;
    if (skippedFiles.includes(app)) continue;

    const appFullPath = path.join(appsDirPath, app);
    if (!fs.statSync(appFullPath).isDirectory()) continue;

    // Determine link path
    let linkPath = "";
    if (fs.existsSync(path.join(appFullPath, "package.json"))) {
      // It's likely a Vite/React app
      linkPath = `${config.prefix}${app}/dist/index.html`;
    } else if (fs.existsSync(path.join(appFullPath, "index.html"))) {
      // Static HTML
      linkPath = `${config.prefix}${app}/index.html`;
    } else {
      console.log(`Skipping ${app}: No index.html or package.json found.`);
      continue;
    }

    // Check if link exists in dashboard
    // We normalize paths to forward slashes for check
    const normalizedLink = linkPath.replace(/\\/g, "/");
    if (!htmlContent.includes(normalizedLink)) {
      console.log(`Adding missing app: ${app} to ${config.name}`);
      newCards.push(generateCard(app, normalizedLink, config.name));
      addedCount++;
    }
  }

  if (addedCount > 0) {
    // Injection strategy: Find the last </a> and insert after it.
    // Or find the closing div of the grid.
    // The grid usually matches <div class="grid ..."> ... </div>
    // We can search for the last </a> inside the file, find its closing tag position, and append there.
    // Assuming strict formatting is risky.

    // Find the last occurrence of </a>
    const lastAnchorIndex = htmlContent.lastIndexOf("</a>");
    if (lastAnchorIndex !== -1) {
      const insertPos = lastAnchorIndex + 4; // length of </a>

      const before = htmlContent.substring(0, insertPos);
      const after = htmlContent.substring(insertPos);

      const newContent = newCards.join("\n");
      htmlContent = before + "\n" + newContent + after;

      fs.writeFileSync(dashboardPath, htmlContent, "utf8");
      console.log(
        `Updated ${config.name} dashboard with ${addedCount} new apps.`
      );
    } else {
      // If no anchors, maybe empty grid? Try finding grid opening.
      console.log(`Could not find anchor tags to append to in ${config.name}.`);
    }
  } else {
    console.log(`No new apps to add for ${config.name}.`);
  }
}

// Run updates
dashboards.forEach((config) => updateDashboard(config));
