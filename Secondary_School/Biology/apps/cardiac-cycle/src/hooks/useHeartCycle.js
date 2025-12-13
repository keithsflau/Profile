import { useMemo } from 'react';
import { cardiacData } from '../utils/cardiacData';

export const useHeartCycle = (time) => {
    const currentData = useMemo(() => {
        // Find closer data point
        // Assuming sorted by time
        const exactMatch = cardiacData.find(d => Math.abs(d.time - time) < 0.005);
        if (exactMatch) return exactMatch;

        // Fallback if not exact
        return cardiacData.reduce((prev, curr) => {
            return (Math.abs(curr.time - time) < Math.abs(prev.time - time) ? curr : prev);
        });
    }, [time]);

    // Derive Valve States
    // Bicuspid (Mitral): Open if P_Atrium > P_Ventricle (with slight buffer for simulation stability)
    const isBicuspidOpen = currentData.pressureAtrium > currentData.pressureVentricle;

    // Semi-lunar (Aortic): Open if P_Ventricle > P_Aorta
    // Note: in reality aortic valve is open during ejection. Our data simulation ensures Vent > Aorta roughly during ejection.
    // We check the phase name or pressure logic. Pressure logic is requested.
    const isAorticOpen = currentData.pressureVentricle > currentData.pressureAorta;

    // Enhance phase detection from data if needed, or just use data's phase
    const phase = currentData.phase;

    return {
        ...currentData,
        isBicuspidOpen,
        isAorticOpen,
    };
};
