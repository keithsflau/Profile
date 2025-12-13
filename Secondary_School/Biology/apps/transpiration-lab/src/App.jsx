import React, { useState, useEffect, useRef } from 'react';
import StomataVisualizer from './components/StomataVisualizer';
import PotometerLab from './components/PotometerLab';
import { Leaf } from 'lucide-react';

function App() {
  // Environmental States
  const [light, setLight] = useState(50);
  const [wind, setWind] = useState(20);
  const [humidity, setHumidity] = useState(40);

  // Experiment States
  const [isRunning, setIsRunning] = useState(false);
  const [bubblePos, setBubblePos] = useState(100); // 100% (right) to 0% (left)

  // Calculated Transpiration Rate
  // Formula: Base * LightFactor * WindFactor * DrynessFactor
  // Light: 0-100. Factor 0-1.
  // Wind: 0-100. Factor 1-2 (wind increases rate).
  // Humidity: 0-100. Factor 1-0 (humidity decreases rate).
  const baseRate = 30;

  // Cuticular transpiration (very low baseline if closed?) 
  // Requirements say "near zero (cuticular transpiration only)" if light zero.
  // We'll add a tiny epsilon if light is 0 but cuticular isn't usually measured well in potometer short term unless specific.
  // Let's stick to the multiplier logic.

  const lightFactor = light / 100;
  const windFactor = 1 + (wind / 100);
  const humidityFactor = Math.max(0, 1 - (humidity / 95)); // Reach 0 rate at 95% humidity?

  const calculatedRate = baseRate * lightFactor * windFactor * humidityFactor;

  const lastFrameTime = useRef(0);

  // Animation Loop for Bubble
  useEffect(() => {
    let animationFrameId;

    const animate = (time) => {
      if (lastFrameTime.current === 0) lastFrameTime.current = time;
      const deltaTime = time - lastFrameTime.current;
      lastFrameTime.current = time;

      if (isRunning && bubblePos > 0) {
        // Rate is in mm/min (arbitrary units for display).
        // Let's map rate 10 -> 10% movement per second for visibility.
        // calculatedRate approx 0-60.
        // speed = rate * scale.
        const speed = calculatedRate * 0.005; // Adjust this constant for visual speed

        // deltaTime is in ms. 
        // movement = speed * (deltaTime / 16.66)
        const movement = speed * (deltaTime / 20);

        setBubblePos(prev => Math.max(0, prev - movement));
      }

      if (isRunning && bubblePos <= 0) {
        setIsRunning(false); // Stop if reached end
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lastFrameTime.current = 0;
    };
  }, [isRunning, calculatedRate, bubblePos]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-green-200">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur">
            <Leaf size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Virtual Biology Lab: Transpiration</h1>
            <p className="text-green-100 text-sm">HKDSE Biology • Stomatal Mechanism & Potometer</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[calc(100vh-120px)]">

        {/* Left Col: Mechanism View */}
        <section className="h-[500px] lg:h-full">
          <StomataVisualizer lightIntensity={light} />
        </section>

        {/* Right Col: Experiment View */}
        <section className="h-full">
          <PotometerLab
            light={light} setLight={setLight}
            wind={wind} setWind={setWind}
            humidity={humidity} setHumidity={setHumidity}
            rate={calculatedRate}
            isRunning={isRunning} setIsRunning={setIsRunning}
            bubblePos={bubblePos} setBubblePos={setBubblePos}
          />
        </section>

      </main>
    </div>
  );
}

export default App;
