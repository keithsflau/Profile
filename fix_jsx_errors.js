const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "Secondary_School/Biology/apps");

const apps = fs.readdirSync(basePath).filter((f) => {
  const stat = fs.statSync(path.join(basePath, f));
  return (
    stat.isDirectory() &&
    fs.existsSync(path.join(basePath, f, "src", "App.jsx"))
  );
});

console.log(`Processing ${apps.length} apps...\n`);

let fixedCount = 0;

apps.forEach((appName) => {
  const filePath = path.join(basePath, appName, "src", "App.jsx");
  let content = fs.readFileSync(filePath, "utf8");
  const originalContent = content;

  // Fix 1: Remove duplicate footer/visitcounter and extra export at end
  const footerPattern =
    /export default App;?\s*\r?\n\s*\n*const Footer[\s\S]*$/;
  if (footerPattern.test(content)) {
    content = content.replace(footerPattern, "export default App;\n");
  }

  // Fix 2: Replace patterns like </footer></div></div> with </footer>\n    </div>
  content = content.replace(
    /<\/footer><\/div><\/div>\s*\n/g,
    "</footer>\n    </div>\n"
  );

  // Fix 3: Replace patterns like </Canvas></div></div> with </Canvas>\n    </div>
  content = content.replace(
    /<\/Canvas><\/div><\/div>\s*\n/g,
    "</Canvas>\n    </div>\n"
  );

  // Fix 4: Replace patterns like </main></div></div>\n at end with proper closing
  content = content.replace(
    /<\/main><\/div><\/div>\s*\n(\s*\))/g,
    "</main>\n    </div>\n$1"
  );

  // Fix 5: Replace patterns like </div></div></div> at the end just before );
  content = content.replace(
    /<\/div><\/div><\/div>\s*\n(\s*\);)/g,
    "</div>\n    </div>\n$1"
  );

  // Fix 6: Look for lines containing only "    </div>" that should be "      </div>" etc
  // This is more complex - need context

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${appName}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files.`);
