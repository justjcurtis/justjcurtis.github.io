import { useRef, useEffect, useCallback } from "react";
import { COMMANDS } from "../data/constants";

export const useVolumeLevel = (interval = 16, targetFreqs = COMMANDS) => {
    const volume = useRef(new Array(Object.keys(targetFreqs).length));
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

        const keys = Object.keys(targetFreqs)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const targetFreq = targetFreqs[key]

            // Frequency resolution per bin
            const binHz = sampleRate / fftSize;

            // Index of the bin closest to the target frequency
            const targetIndex = Math.round(targetFreq / binHz);

            // Use a narrow window around target frequency (±1 bin)
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
            volume.current[i] = avg / 255;
        }
    };

    const startRecording = useCallback(async () => {
        if (audioContextRef.current) return; // Already running

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    channelCount: 1
                }
            });
            mediaStreamRef.current = stream;

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(stream);
            sourceRef.current = source;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;

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
        for (let i = 0; i < volume.current.length; i++) {
            volume.current[i] = 0
        }
    }, []);

    useEffect(() => {
        return () => {
            stopRecording(); // Cleanup on unmount
        };
    }, [stopRecording]);

    return { volume, startRecording, stopRecording };
}
