# Build All Apps - Instructions

This document provides instructions for building all applications in the project.

## Quick Build Script

Run the PowerShell script to build all apps:

```powershell
powershell -ExecutionPolicy Bypass -File build-all.ps1
```

## Manual Build

To build apps individually, navigate to each app directory and run:

```bash
npm install
npm run build
```

## Apps to Build

### Biology Apps
- allopatric-speciation
- antibiotic-resistance
- cellular-respiration
- energy-flow
- flowering-plants-reproduction
- food-test-simulation
- gel-electrophoresis
- immune-response
- menstrual-cycle
- photosynthesis
- protein-synthesis
- recombinant-dna
- translocation-in-phloem
- muscle-contraction
- genetics-punnett-pedigree
- oxygen-dissociation
- action-potential
- glucose-regulation
- transpiration-lab
- mechanisms-of-movement
- fluid-mosaic-model
- enzyme-kinetics
- cholinergic-synapse
- cell-cycle-mitosis

### Other Apps
- Primary_School/English_Vocabulary
- Primary_School/PrimaryChinese/story_dice
- Primary_School/PrimaryChinese/粵語伴讀：濫竽充數
- Secondary_School/Junior Science/F2_JS_BioCycle
- Secondary_School/Economy/Hong_Kong_Tycoon_Dream

## Notes

- All apps use Vite as the build tool
- Build outputs are in the `dist/` directory
- Some apps may need dependencies installed first (`npm install`)
