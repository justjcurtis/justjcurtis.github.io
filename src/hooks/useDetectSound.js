import { useEffect, useRef, useCallback } from 'react';
import { useVolumeLevel } from './useVolumeLevel';

const useDetectSound = (onDetect, threshold, debounceMs) => {
    const { startRecording, stopRecording, volume } = useVolumeLevel();
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    
    // Create a stable debounced function using useCallback
    const debouncedOnDetect = useCallback((volumeLevel) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log("Debounced sound detection with volume:", volumeLevel);
            onDetect(volumeLevel);
        }, debounceMs);
    }, [onDetect, debounceMs]);
    
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (volume.current > threshold / 100) {
                console.log("Sound detected with volume:", volume.current);
                debouncedOnDetect(volume.current);
            }
        }, 40);
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [threshold, debouncedOnDetect]);
    return {
        startListening: startRecording,
        stopListening: stopRecording,
    }
};

export default useDetectSound;

