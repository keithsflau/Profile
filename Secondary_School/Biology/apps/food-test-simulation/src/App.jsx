import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Flame, Info } from 'lucide-react';
import ReagentShelf from './components/ReagentShelf';
import TestTubeRack from './components/TestTubeRack';
import Equipment from './components/Equipment';
import ResultsTable from './components/ResultsTable';
import InfoPanel from './components/InfoPanel';

function App() {
  const [testTubes, setTestTubes] = useState([
    { id: 1, sample: 'Mystery Solution A', contents: ['sample-a'], temperature: 'room', isShaking: false, color: '#f0e68c' },
    { id: 2, sample: 'Solution B', contents: ['sample-b'], temperature: 'room', isShaking: false, color: '#e6f2ff' },
    { id: 3, sample: 'Solution C', contents: ['sample-c'], temperature: 'room', isShaking: false, color: '#ffe6f0' },
  ]);

  const [selectedTube, setSelectedTube] = useState(null);
  const [results, setResults] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(null);

  // Handle adding reagent to test tube
  const handleAddReagent = (reagentId) => {
    if (selectedTube === null) {
      alert('Please select a test tube first!');
      return;
    }

    setTestTubes(prev => prev.map(tube => {
      if (tube.id === selectedTube) {
        const newContents = [...tube.contents, reagentId];
        const newColor = calculateColor(newContents, tube.temperature, tube.isShaking);
        return { ...tube, contents: newContents, color: newColor };
      }
      return tube;
    }));

    // Check for reactions
    checkReaction(selectedTube, reagentId);
  };

  // Handle heating
  const handleHeat = () => {
    if (selectedTube === null) {
      alert('Please select a test tube first!');
      return;
    }

    setTestTubes(prev => prev.map(tube => {
      if (tube.id === selectedTube) {
        const newTemp = tube.temperature === 'room' ? 'hot' : tube.temperature;
        const newColor = calculateColor(tube.contents, newTemp, tube.isShaking);
        return { ...tube, temperature: newTemp, color: newColor };
      }
      return tube;
    }));

    // Check for reactions after heating
    checkReaction(selectedTube);
  };

  // Handle shaking
  const handleShake = () => {
    if (selectedTube === null) {
      alert('Please select a test tube first!');
      return;
    }

    setTestTubes(prev => prev.map(tube => {
      if (tube.id === selectedTube) {
        return { ...tube, isShaking: !tube.isShaking };
      }
      return tube;
    }));

    // Reset shaking after animation
    setTimeout(() => {
      setTestTubes(prev => prev.map(tube => {
        if (tube.id === selectedTube) {
          return { ...tube, isShaking: false };
        }
        return tube;
      }));
    }, 1000);
  };

  // Calculate color based on contents and conditions
  const calculateColor = (contents, temperature, isShaking) => {
    const sample = contents[0];
    
    // Reducing Sugar Test (Benedict's)
    if (contents.includes('benedicts') && temperature === 'hot') {
      // Mystery Solution A contains Glucose (reducing sugar)
      if (sample === 'sample-a') {
        return '#cd5c5c'; // Brick red
      }
      // Solution C contains Sucrose (non-reducing sugar initially)
      if (sample === 'sample-c' && !contents.includes('hcl')) {
        return '#4169e1'; // Stays blue
      }
      // After acid hydrolysis
      if (sample === 'sample-c' && contents.includes('hcl') && contents.includes('nahco3')) {
        return '#cd5c5c'; // Brick red
      }
    }
    
    // Starch Test (Iodine)
    if (contents.includes('iodine')) {
      // Solution B contains Starch
      if (sample === 'sample-b') {
        return '#191970'; // Blue-black
      }
    }
    
    // Protein Test (Biuret)
    if (contents.includes('biuret')) {
      // Solution B contains Protein
      if (sample === 'sample-b') {
        return '#9370db'; // Purple/Lilac
      }
    }
    
    // Vitamin C Test (DCPIP)
    if (contents.includes('dcpip')) {
      // Mystery Solution A contains Vitamin C
      if (sample === 'sample-a') {
        return '#f0e68c'; // Decolorized (back to sample color)
      }
      return '#4169e1'; // Blue if no vitamin C
    }
    
    // Lipid Test (Ethanol)
    if (contents.includes('ethanol') && isShaking) {
      // Solution C contains Lipids
      if (sample === 'sample-c') {
        return '#f5f5f5'; // Milky white emulsion
      }
    }
    
    // Default colors based on reagent
    if (contents.includes('benedicts')) return '#4169e1'; // Blue
    if (contents.includes('iodine')) return '#8b4513'; // Brown
    if (contents.includes('biuret')) return '#87ceeb'; // Light blue
    if (contents.includes('dcpip')) return '#4169e1'; // Blue
    if (contents.includes('ethanol')) return '#f0f0f0'; // Clear
    
    // Default sample colors
    if (sample === 'sample-a') return '#f0e68c';
    if (sample === 'sample-b') return '#e6f2ff';
    if (sample === 'sample-c') return '#ffe6f0';
    
    return '#f0e68c';
  };

  // Check for reactions and update results
  const checkReaction = (tubeId, newReagent = null) => {
    const tube = testTubes.find(t => t.id === tubeId);
    if (!tube) return;

    const { sample, contents, temperature } = tube;
    
    // Benedict's Test (Reducing Sugar)
    if (contents.includes('benedicts') && temperature === 'hot') {
      if (sample === 'sample-a') {
        addResult(sample, 'Reducing Sugar (Benedict\'s)', 'Positive', 'Brick Red Precipitate', 
          'Sample A contains reducing sugars (e.g., glucose).');
      } else if (sample === 'sample-c' && !contents.includes('hcl')) {
        addResult(sample, 'Reducing Sugar (Benedict\'s)', 'Negative', 'Stays Blue', 
          'Sample C does not contain reducing sugars initially. It may contain non-reducing sugars.');
      }
    }
    
    // Iodine Test (Starch)
    if (contents.includes('iodine')) {
      if (sample === 'sample-b') {
        addResult(sample, 'Starch (Iodine)', 'Positive', 'Blue-Black Color', 
          'Sample B contains starch.');
      } else {
        addResult(sample, 'Starch (Iodine)', 'Negative', 'Brown Color', 
          'No starch detected.');
      }
    }
    
    // Biuret Test (Protein)
    if (contents.includes('biuret')) {
      if (sample === 'sample-b') {
        addResult(sample, 'Protein (Biuret)', 'Positive', 'Purple/Lilac Color', 
          'Sample B contains proteins.');
      } else {
        addResult(sample, 'Protein (Biuret)', 'Negative', 'Blue Color', 
          'No protein detected.');
      }
    }
    
    // DCPIP Test (Vitamin C)
    if (contents.includes('dcpip')) {
      if (sample === 'sample-a') {
        addResult(sample, 'Vitamin C (DCPIP)', 'Positive', 'Decolorized', 
          'Sample A contains Vitamin C (ascorbic acid).');
      } else {
        addResult(sample, 'Vitamin C (DCPIP)', 'Negative', 'Stays Blue', 
          'No Vitamin C detected.');
      }
    }
    
    // Non-Reducing Sugar Test (Advanced)
    if (contents.includes('hcl') && contents.includes('nahco3') && contents.includes('benedicts') && temperature === 'hot') {
      if (sample === 'sample-c') {
        addResult(sample, 'Non-Reducing Sugar (Acid Hydrolysis + Benedict\'s)', 'Positive', 'Brick Red Precipitate', 
          'Sample C contains non-reducing sugars (e.g., sucrose). Acid hydrolysis breaks glycosidic bonds, releasing reducing sugars (glucose/fructose).');
        setCurrentInfo('non-reducing');
        setShowInfo(true);
      }
    }
  };

  // Add result to table
  const addResult = (sample, test, result, observation, explanation) => {
    setResults(prev => {
      // Check if result already exists
      const exists = prev.some(r => r.sample === sample && r.test === test);
      if (exists) {
        return prev.map(r => 
          r.sample === sample && r.test === test
            ? { sample, test, result, observation, explanation }
            : r
        );
      }
      return [...prev, { sample, test, result, observation, explanation }];
    });
  };

  // Reset test tube
  const resetTube = (tubeId) => {
    setTestTubes(prev => prev.map(tube => {
      if (tube.id === tubeId) {
        const sample = tube.contents[0];
        const defaultColor = sample === 'sample-a' ? '#f0e68c' : 
                            sample === 'sample-b' ? '#e6f2ff' : '#ffe6f0';
        return {
          ...tube,
          contents: [sample],
          temperature: 'room',
          isShaking: false,
          color: defaultColor
        };
      }
      return tube;
    }));
  };

  return (
    <div className="min-h-screen text-white p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Beaker className="w-12 h-12 text-cyan-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Food Test Laboratory
          </h1>
          <Flame className="w-12 h-12 text-orange-400" />
        </div>
        <p className="text-xl text-gray-300">
          HKDSE Biology: Biochemical Tests for Biomolecules
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Perform tests for: Glucose, Starch, Protein, Vitamin C, and Non-reducing Sugars
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-6">
          <ReagentShelf onAddReagent={handleAddReagent} />
          <Equipment 
            onHeat={handleHeat} 
            onShake={handleShake}
            selectedTube={selectedTube}
          />
        </div>

        {/* Center Panel - Test Tubes */}
        <div className="lg:col-span-1">
          <TestTubeRack 
            testTubes={testTubes}
            selectedTube={selectedTube}
            onSelectTube={setSelectedTube}
            onResetTube={resetTube}
          />
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-1">
          <ResultsTable results={results} />
        </div>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <InfoPanel 
            type={currentInfo} 
            onClose={() => setShowInfo(false)} 
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12 text-gray-400 text-sm"
      >
        <p className="flex items-center justify-center gap-2">
          <Info className="w-4 h-4" />
          Select a test tube, add reagents, and perform tests to identify biomolecules
        </p>
      </motion.div>
    </div>
  );
}

export default App;
