import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for detecting sound levels above a specified threshold
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Volume threshold (0-100)
 * @param {Function} options.onDetect - Callback function when sound is detected
 * @param {number} options.duration - Duration in milliseconds to maintain threshold before triggering (default: 100ms)
 * @param {number} options.sensitivity - Sensitivity multiplier for volume detection (default: 1)
 * @returns {Object} Hook state and controls
 */
const useDetectSound = ({
    threshold = 50,
    onDetect,
    duration = 100,
    sensitivity = 1
}) => {
    const [isListening, setIsListening] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(0);
    const [isDetecting, setIsDetecting] = useState(false);
    const [error, setError] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

    // Refs for audio context and related objects
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const microphoneRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Refs for detection timing
    const detectionStartTimeRef = useRef(null);
    const lastDetectionRef = useRef(false);

    // Calculate volume from frequency data
    const calculateVolume = useCallback((dataArray) => {
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i] * dataArray[i];
        }
        const rms = Math.sqrt(sum / dataArray.length);
        return Math.min(100, (rms / 128) * 100 * sensitivity);
    }, [sensitivity]);

    // Audio processing loop
    const processAudio = useCallback(() => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const volume = calculateVolume(dataArrayRef.current);
        setCurrentVolume(volume);

        const isAboveThreshold = volume > threshold;
        const currentTime = Date.now();

        if (isAboveThreshold) {
            if (!lastDetectionRef.current) {
                // Sound just went above threshold
                detectionStartTimeRef.current = currentTime;
                lastDetectionRef.current = true;
                setIsDetecting(true);
            } else {
                // Sound has been above threshold, check duration
                const timeSinceStart = currentTime - detectionStartTimeRef.current;
                if (timeSinceStart >= duration && onDetect) {
                    onDetect(volume);
                    // Reset to prevent repeated triggers
                    detectionStartTimeRef.current = currentTime;
                }
            }
        } else {
            if (lastDetectionRef.current) {
                // Sound just went below threshold
                lastDetectionRef.current = false;
                setIsDetecting(false);
                detectionStartTimeRef.current = null;
            }
        }

        if (isListening) {
            animationFrameRef.current = requestAnimationFrame(processAudio);
        }
    }, [threshold, duration, onDetect, calculateVolume, isListening]);

    // Initialize audio context and microphone
    const initializeAudio = useCallback(async () => {
        try {
            setError(null);

            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });

            setHasPermission(true);

            // Create audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);

            // Configure analyser
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;

            microphone.connect(analyser);

            // Store references
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            microphoneRef.current = { stream, source: microphone };
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

            return true;
        } catch (err) {
            console.error('Error initializing audio:', err);
            setError(err.message);
            setHasPermission(false);
            return false;
        }
    }, []);

    // Start listening for sound
    const startListening = useCallback(async () => {
        if (isListening) return;

        const initialized = await initializeAudio();
        if (initialized) {
            setIsListening(true);
            processAudio();
        }
    }, [isListening, initializeAudio, processAudio]);

    // Stop listening for sound
    const stopListening = useCallback(() => {
        setIsListening(false);
        setIsDetecting(false);
        setCurrentVolume(0);

        // Cancel animation frame
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        // Clean up audio resources
        if (microphoneRef.current) {
            // Stop all tracks in the stream
            if (microphoneRef.current.stream) {
                microphoneRef.current.stream.getTracks().forEach(track => track.stop());
            }
            microphoneRef.current = null;
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        analyserRef.current = null;
        dataArrayRef.current = null;

        // Reset detection state
        detectionStartTimeRef.current = null;
        lastDetectionRef.current = false;
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
        };
    }, [stopListening]);

    // Check for browser support
    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError('Browser does not support microphone access');
            setHasPermission(false);
        }
    }, []);

    return {
        // State
        isListening,
        currentVolume: Math.round(currentVolume),
        isDetecting,
        error,
        hasPermission,

        // Controls
        startListening,
        stopListening,

        // Configuration (readonly)
        threshold,
        duration,
        sensitivity
    };
};

export default useDetectSound;

