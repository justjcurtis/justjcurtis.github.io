import { useEffect, useRef, useCallback } from 'react';
import { useVolumeLevel } from './useVolumeLevel';

const useDetectSound = (onDetect, threshold, debounceMs) => {
    const { startRecording, stopRecording, volume } = useVolumeLevel();
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    // Create a stable debounced function using useCallback
    const debouncedOnDetect = useCallback((index) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onDetect(index);
        }, debounceMs);
    }, [onDetect, debounceMs]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            for (let i = 0; i < volume.current.length; i++) {
                const vol = volume.current[i]
                if (vol > threshold / 100) {
                    debouncedOnDetect(i);
                }
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

