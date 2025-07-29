import { useState, useEffect, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { LONG_TEXT } from '../data/constants';

function playBeep(frequency = 440, duration = 500) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine'; // Types: 'sine', 'square', 'triangle', 'sawtooth'
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration / 1000);
}

export const GapDecoder = () => {
    const lastResult = useRef("");
    const [finalResult, setFinalResult] = useState("");
    const lastResultTimestamp = useRef(null);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef(null);

    const handleResult = (text) => {
        if (text === lastResult.current) {
            return; // Ignore duplicate results
        }
        const now = Date.now();
        if (lastResultTimestamp.current && (now - lastResultTimestamp.current) < 1000) {
            return; // Ignore results that come too quickly
        }
        lastResultTimestamp.current = now;
        lastResult.current = text;
        setFinalResult(prev => prev + text);
        playBeep(440, 300)
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const now = Date.now();
            if (lastResultTimestamp.current && (now - lastResultTimestamp.current) > 5000) {
                // If no new result for 2 seconds, consider it finished
                setIsFinished(true);
                clearInterval(intervalRef.current);
            }
        }, 1000);

        playBeep(440, 300); // Initial beep to indicate start
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [])

    return (
        <div className="flex-1 flex items-center justify-center select-none">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
                {!isFinished &&
                    <>
                        <QrReader
                            constraints={{ facingMode: 'environment' }}
                            onResult={(result, error) => {
                                if (!!result) {
                                    handleResult(result.text);
                                }

                                if (!!error) {
                                }
                            }}
                            style={{ width: '100%' }}
                        />
                        <div className="text-center mt-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                    setIsFinished(true);
                                    clearInterval(intervalRef.current);
                                }}>
                                Finish Decoding
                            </button>
                        </div>

                    </>}
                {isFinished && (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Decoding Finished</h2>
                        <p className="text-lg mb-4">Final Result:</p>
                        <textarea
                            id="textInput"
                            defaultValue={finalResult}
                            className="w-full h-40 p-3 border border-gray-300 rounded-md resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={6}
                        />
                        <p>decoded correctly: {finalResult == LONG_TEXT ? "✅" : "❌"}</p>
                    </div>
                )}
            </div>

        </div>
    )
}
