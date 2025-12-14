import { motion } from 'framer-motion';
import { Droplet, FlaskConical } from 'lucide-react';

const reagents = [
  { id: 'benedicts', name: "Benedict's Solution", color: '#4169e1', textColor: 'text-blue-400' },
  { id: 'iodine', name: 'Iodine Solution', color: '#8b4513', textColor: 'text-amber-700' },
  { id: 'biuret', name: 'Biuret Solution', color: '#87ceeb', textColor: 'text-sky-300' },
  { id: 'dcpip', name: 'DCPIP Solution', color: '#4169e1', textColor: 'text-blue-500' },
  { id: 'ethanol', name: 'Ethanol', color: '#f0f0f0', textColor: 'text-gray-300' },
  { id: 'hcl', name: 'Dilute HCl (Acid)', color: '#ffcccc', textColor: 'text-red-300' },
  { id: 'nahco3', name: 'Sodium Hydrogen Carbonate (Alkali)', color: '#ccffcc', textColor: 'text-green-300' },
];

export default function ReagentShelf({ onAddReagent }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <FlaskConical className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-cyan-400">Reagents Shelf</h2>
      </div>
      
      <div className="space-y-3">
        {reagents.map((reagent, index) => (
          <motion.button
            key={reagent.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddReagent(reagent.id)}
            className="w-full glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-all group"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Droplet 
                className="w-8 h-8" 
                style={{ color: reagent.color }}
                fill={reagent.color}
              />
            </motion.div>
            
            <div className="flex-1 text-left">
              <p className={`font-semibold ${reagent.textColor}`}>
                {reagent.name}
              </p>
              <p className="text-xs text-gray-400">
                Click to add to selected tube
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="text-cyan-400 text-sm"
            >
              Add →
            </motion.div>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-xs text-yellow-300">
          💡 <strong>Tip:</strong> Select a test tube first, then add reagents
        </p>
      </div>
    </motion.div>
  );
}
