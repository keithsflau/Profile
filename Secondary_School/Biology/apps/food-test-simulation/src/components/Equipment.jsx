import { motion } from 'framer-motion';
import { Flame, FlaskRound } from 'lucide-react';

export default function Equipment({ onHeat, onShake, selectedTube }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <FlaskRound className="w-6 h-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-orange-400">Equipment</h2>
      </div>

      <div className="space-y-4">
        {/* Water Bath / Heater */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <Flame className="w-6 h-6 text-orange-500" />
            <h3 className="font-semibold text-orange-300">Water Bath</h3>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHeat}
            disabled={!selectedTube}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              selectedTube
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedTube ? '🔥 Heat Test Tube' : '🔥 Select Tube First'}
          </motion.button>

          <p className="text-xs text-gray-400 mt-2">
            Heat to ~80°C for Benedict's test
          </p>
        </motion.div>

        {/* Shake Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FlaskRound className="w-6 h-6 text-cyan-500" />
            </motion.div>
            <h3 className="font-semibold text-cyan-300">Shake / Mix</h3>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: [0, -5, 5, -5, 5, 0] }}
            onClick={onShake}
            disabled={!selectedTube}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              selectedTube
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedTube ? '🔄 Shake Test Tube' : '🔄 Select Tube First'}
          </motion.button>

          <p className="text-xs text-gray-400 mt-2">
            Mix reagents thoroughly
          </p>
        </motion.div>

        {/* Instructions */}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-300 mb-2">📋 Procedure:</h4>
          <ol className="text-xs text-gray-300 space-y-1 list-decimal list-inside">
            <li>Select a test tube</li>
            <li>Add appropriate reagent(s)</li>
            <li>Heat or shake if required</li>
            <li>Observe color change</li>
            <li>Record results</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}
