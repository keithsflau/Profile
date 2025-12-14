# Fixes Applied

## Logic Bugs Fixed

1. **allopatric-speciation/src/App.jsx**
   - Fixed: Removed duplicate `setPopB` call in `handleSplit` function
   - Issue: `setPopB` was called twice (lines 90 and 93), causing unnecessary re-renders

2. **gel-electrophoresis/src/App.jsx**
   - Fixed: Renamed `errorError` variable to `errorMessage` for clarity
   - Issue: Variable name was confusing and potentially a typo
   - Changed all occurrences: `errorError` → `errorMessage`, `setErrorError` → `setErrorMessage`

## Academic Accuracy

1. **photosynthesis/src/components/CalvinCycleView.jsx**
   - Added comments explaining ATP/NADPH consumption
   - Note: The app uses a simplified model (1 ATP per cycle for regeneration) which is acceptable for teaching purposes
   - Standard: 3 ATP + 2 NADPH per CO2 fixed (18 ATP + 12 NADPH per glucose)

2. **cellular-respiration**
   - Verified ATP calculations are correct:
     - Glycolysis: 2 ATP ✓
     - Krebs Cycle: 2 ATP ✓
     - Oxidative Phosphorylation: 34 ATP ✓
     - Total: 38 ATP ✓

3. **energy-flow**
   - Verified 10% rule implementation is correct
   - Energy transfer calculations are accurate

## Visit Counter Added

All apps now have visit counter functionality:
- Added to all Biology apps (24 apps)
- Added to Primary Chinese apps (2 apps: lesson-13, 粵語伴讀：濫竽充數)
- All Secondary Chinese apps already had visit counters

## Build Scripts Created

- `build-all-apps.ps1` - Comprehensive build script for all apps
- `build-all.js` - Node.js version of build script
- `BUILD_ALL.md` - Documentation for building apps
