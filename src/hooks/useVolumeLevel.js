import { useRef, useEffect, useCallback } from "react";

export const useVolumeLevel = (interval = 100, targetFreq = 440) => {
    const volume = useRef(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const dataArrayRef = useRef(null);
    const intervalIdRef = useRef(null);
    const mediaStreamRef = useRef(null);

    const updateVolume = () => {
        if (!analyserRef.current || !dataArrayRef.current || !audioContextRef.current) return;

        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;
        const sampleRate = audioContextRef.current.sampleRate;
        const fftSize = analyser.fftSize;

        analyser.getByteFrequencyData(dataArray);

        // Frequency resolution per bin
        const binHz = sampleRate / fftSize;

        // Index of the bin closest to 440 Hz
        const targetIndex = Math.round(targetFreq / binHz);

        // Use a narrow window around 440 Hz (±1 bin)
        const range = 1;
        let sum = 0;
        let count = 0;

        for (let i = targetIndex - range; i <= targetIndex + range; i++) {
            if (i >= 0 && i < dataArray.length) {
                sum += dataArray[i];
                count++;
            }
        }

        // Average and normalize
        const avg = count > 0 ? sum / count : 0;
        volume.current = avg / 255;
    };

    const startRecording = useCallback(async () => {
        if (audioContextRef.current) return; // Already running

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(stream);
            sourceRef.current = source;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            dataArrayRef.current = dataArray;

            source.connect(analyser);
            analyserRef.current = analyser;

            intervalIdRef.current = setInterval(updateVolume, interval);
        } catch (err) {
            console.error("Error accessing microphone", err);
        }
    }, [interval]);

    const stopRecording = useCallback(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }

        audioContextRef.current?.close();
        audioContextRef.current = null;

        analyserRef.current = null;
        sourceRef.current = null;
        dataArrayRef.current = null;
        volume.current = 0; // Reset volume
    }, []);

    useEffect(() => {
        return () => {
            stopRecording(); // Cleanup on unmount
        };
    }, [stopRecording]);

    return { volume, startRecording, stopRecording };
}
