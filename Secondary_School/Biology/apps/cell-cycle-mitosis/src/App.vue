<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 md:p-8">
    <header class="max-w-7xl mx-auto mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          The Cell Cycle & Mitosis
        </h1>
        <p class="text-gray-400 mt-2">Interactive Visualizer for HKDSE Biology</p>
      </div>
      <!-- Progress Bar -->
      <div class="hidden md:block w-1/3">
         <div class="w-full bg-gray-700 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500" :style="{ width: (store.progress * 100) + '%' }"></div>
         </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Visualizer Area (2/3 width) -->
      <div class="lg:col-span-2 space-y-6">
        <CellVisualizer />
        <DnaGraph />
      </div>

      <!-- Sidebar Area (1/3 width) -->
      <div class="lg:col-span-1">
        <Dashboard />
      </div>
    </main>

    <footer class="max-w-7xl mx-auto mt-12 text-center text-gray-500 text-sm">
      <p>© 2025 HKDSE Biology Educational Series - Created by Antigravity</p>
    </footer>
  </div>
</template>

<script setup>
import CellVisualizer from './components/CellVisualizer.vue'
import Dashboard from './components/Dashboard.vue'
import DnaGraph from './components/DnaGraph.vue'
import { useMitosisStore } from './stores/mitosis'

const store = useMitosisStore()
</script>

<style>
/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #1f2937; 
}
::-webkit-scrollbar-thumb {
  background: #4b5563; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #6b7280; 
}
</style>
