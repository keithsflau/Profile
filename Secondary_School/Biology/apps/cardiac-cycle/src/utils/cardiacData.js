export const generateCardiacData = () => {
    const data = [];
    const duration = 0.8;
    const steps = 100; // 8ms per step

    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * duration;
        let aortaP, ventricleP, atriumP;
        let phase = "";

        // Approximate pressure curves based on Textbook data

        // ATRIUM PRESSURE (LA)
        // Small bump at 0-0.1 (Atrial Systole), then low, then rising during ventricular systole (filling), then drop when AV opens.
        if (t < 0.1) {
            // Atrial Systole
            atriumP = 5 + 5 * Math.sin((t / 0.1) * Math.PI); // Peak at 10mmHg
        } else {
            // Diastole/Filling
            atriumP = 2 + 6 * (t / 0.8); // Slow rise
        }

        // VENTRICLE PRESSURE (LV)
        if (t < 0.1) {
            // Atrial Systole filling
            ventricleP = 5 + 3 * Math.sin((t / 0.1) * Math.PI);
        } else if (t < 0.35) {
            // Systole (Contraction + Ejection)
            // Rapid rise 0.1 to 0.15 (Isovolumetric)
            // Peak around 0.25 (120mmHg)
            // Drop after
            const systoleDuration = 0.25;
            const systoleTime = t - 0.1;
            ventricleP = 120 * Math.sin((systoleTime / systoleDuration) * Math.PI);
            if (ventricleP < 8) ventricleP = 8; // floor at filling pressure
        } else {
            // Diastole (Relaxation)
            ventricleP = 0 + 5 * (t / 0.8); // Return to near 0, slight rise
        }

        // AORTA PRESSURE
        // Drops from 80 to ~75/80 until SL valve opens.
        // SL valve opens when Vent P > Aorta P (approx 0.15s)
        // Rises with Vent P to 120.
        // Dicrotic notch at closure.
        // Slow decay (elastic recoil) 120 -> 80.

        if (t < 0.13) {
            // End of previous diastole
            aortaP = 80 - (10 * (t / 0.13));
        } else if (t < 0.38) {
            // Ejection period roughly - track ventricle (simplified) or slightly below
            // Let's make it track ventricle but smoothed
            if (ventricleP > 80) {
                aortaP = ventricleP - 2;
            } else {
                aortaP = 80;
            }
        } else {
            // Diastole - Elastic Recoil
            // Exponential decay from ~100 to 80
            // Simplified linear for DSE level usually, or slight curve
            const diastoleTime = t - 0.38;
            aortaP = 100 - (20 * (diastoleTime / 0.42));
            if (aortaP < 80) aortaP = 80;
        }

        // Corrections for "Crossing Points" Logic to match visual expectations
        // 1. Mitral Close: Vent P > Atrium P (~0.1s)
        // 2. Aortic Open: Vent P > Aorta P (~0.13s)
        // 3. Aortic Close: Vent P < Aorta P (~0.38s)
        // 4. Mitral Open: Vent P < Atrium P (~0.45s)

        // Manual Overrides to ensure clean intersection for graph
        if (t >= 0.1 && t <= 0.12) {
            // Isovolumetric Contraction start
            ventricleP = Math.max(ventricleP, atriumP + 2); // Ensure it crosses
        }
        if (t >= 0.13 && t <= 0.35) {
            // Ejection
            if (ventricleP > aortaP) aortaP = ventricleP - 1; // Aorta follows Ventricle
            else if (ventricleP > 80) aortaP = ventricleP;
        }

        // Dicrotic notch simulation
        if (t > 0.38 && t < 0.42) {
            aortaP += 5;
        }

        // Phase determination (Conceptual)
        if (t < 0.1) phase = "Atrial Systole";
        else if (t < 0.14) phase = "Isovolumetric Contraction";
        else if (t < 0.38) phase = "Ventricular Ejection";
        else if (t < 0.46) phase = "Isovolumetric Relaxation";
        else phase = "Ventricular Diastole";

        // Volume Logic (approximate in ml)
        let volume = 120; // default End Diastolic
        if (t < 0.1) {
            // Atrial kick: 100 -> 120
            volume = 100 + 20 * (t / 0.1);
        } else if (t < 0.14) {
            // Isovolumetric Contraction
            volume = 120;
        } else if (t < 0.38) {
            // Ejection: 120 -> 50
            const ejectionTime = t - 0.14;
            const totalEjection = 0.38 - 0.14;
            volume = 120 - (70 * (ejectionTime / totalEjection));
        } else if (t < 0.46) {
            // Isovolumetric Relaxation
            volume = 50;
        } else {
            // Rapid Inflow / Diastasis: 50 -> 100
            const fillingTime = t - 0.46;
            const totalFilling = 0.8 - 0.46;
            volume = 50 + (50 * (fillingTime / totalFilling));
        }

        data.push({
            time: Number(t.toFixed(3)),
            pressureAorta: Math.max(0, aortaP),
            pressureVentricle: Math.max(0, ventricleP),
            pressureAtrium: Math.max(0, atriumP),
            volume: Math.max(50, volume), // Ensure strictly positive
            phase
        });
    }
    return data;
};

export const cardiacData = generateCardiacData();
