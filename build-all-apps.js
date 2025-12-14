#!/usr/bin/env node

/**
 * Build script for all apps in the project
 * This script will build all Vite/React apps found in the project
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apps = [
  // Biology apps
  'Secondary_School/Biology/apps/allopatric-speciation',
  'Secondary_School/Biology/apps/antibiotic-resistance',
  'Secondary_School/Biology/apps/cellular-respiration',
  'Secondary_School/Biology/apps/energy-flow',
  'Secondary_School/Biology/apps/flowering-plants-reproduction',
  'Secondary_School/Biology/apps/food-test-simulation',
  'Secondary_School/Biology/apps/gel-electrophoresis',
  'Secondary_School/Biology/apps/immune-response',
  'Secondary_School/Biology/apps/menstrual-cycle',
  'Secondary_School/Biology/apps/photosynthesis',
  'Secondary_School/Biology/apps/protein-synthesis',
  'Secondary_School/Biology/apps/recombinant-dna',
  'Secondary_School/Biology/apps/translocation-in-phloem',
  'Secondary_School/Biology/apps/muscle-contraction',
  'Secondary_School/Biology/apps/genetics-punnett-pedigree',
  'Secondary_School/Biology/apps/oxygen-dissociation',
  'Secondary_School/Biology/apps/action-potential',
  'Secondary_School/Biology/apps/glucose-regulation',
  'Secondary_School/Biology/apps/transpiration-lab',
  'Secondary_School/Biology/apps/mechanisms-of-movement',
  'Secondary_School/Biology/apps/fluid-mosaic-model',
  'Secondary_School/Biology/apps/enzyme-kinetics',
  'Secondary_School/Biology/apps/cholinergic-synapse',
  'Secondary_School/Biology/apps/cell-cycle-mitosis',
  // Other apps
  'Primary_School/English_Vocabulary',
  'Primary_School/PrimaryChinese/story_dice',
  'Primary_School/PrimaryChinese/粵語伴讀：濫竽充數',
  'Secondary_School/Junior Science/F2_JS_BioCycle',
  'Secondary_School/Economy/Hong_Kong_Tycoon_Dream',
];

function buildApp(appPath) {
  const fullPath = join(process.cwd(), appPath);
  
  if (!existsSync(join(fullPath, 'package.json'))) {
    console.log(`⏭️  Skipping ${appPath} - no package.json`);
    return { success: false, reason: 'no package.json' };
  }

  console.log(`\n🔨 Building ${appPath}...`);
  
  try {
    // Check if node_modules exists, if not, install dependencies
    if (!existsSync(join(fullPath, 'node_modules'))) {
      console.log(`📦 Installing dependencies for ${appPath}...`);
      execSync('npm install', { 
        cwd: fullPath, 
        stdio: 'inherit',
        env: { ...process.env, CI: 'true' }
      });
    }

    // Build the app
    execSync('npm run build', { 
      cwd: fullPath, 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    console.log(`✅ Successfully built ${appPath}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to build ${appPath}:`, error.message);
    return { success: false, reason: error.message };
  }
}

// Main execution
console.log('🚀 Starting build process for all apps...\n');

const results = [];
for (const app of apps) {
  const result = buildApp(app);
  results.push({ app, ...result });
}

// Summary
console.log('\n📊 Build Summary:');
const successful = results.filter(r => r.success).length;
const failed = results.filter(r => !r.success).length;

console.log(`✅ Successful: ${successful}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
  console.log('\n❌ Failed apps:');
  results.filter(r => !r.success).forEach(r => {
    console.log(`  - ${r.app}: ${r.reason}`);
  });
  process.exit(1);
}

console.log('\n🎉 All apps built successfully!');
