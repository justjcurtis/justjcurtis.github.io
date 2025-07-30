import { useState, useEffect, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { playBeep } from '../utils/helpers';

export const GapDecoder = () => {
    const lastResult = useRef("");
    const [finalResult, setFinalResult] = useState("");
    const lastResultTimestamp = useRef(null);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef(null);

    const handleResult = (text) => {
        if (isFinished) return;
        if (text === lastResult.current) {
            return; // Ignore duplicate results
        }
        const now = Date.now();
        if (lastResultTimestamp.current && (now - lastResultTimestamp.current) < 1000) {
            return; // Ignore results that come too quickly
        }
        lastResult.current = text;
        setFinalResult(prev => prev + text);
        playBeep();
        if (text.length < 1000) setIsFinished(true)
    }

    useEffect(() => {
        setTimeout(() => {
            playBeep();
        }, 300);
    }, [])

    return (
        <div className="flex-1 flex items-center justify-center select-none">
            <div className="bg-neutral rounded-lg shadow-lg p-6 max-w-2xl w-full">
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
                                Collapse Gap
                            </button>
                        </div>

                    </>}
                {isFinished && (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Gapped!</h2>
                        <p className="text-lg mb-4">Observations</p>
                        <textarea
                            id="textInput"
                            disabled
                            defaultValue={finalResult}
                            className="w-full h-40 p-3 border border-gray-300 rounded-md resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={6}
                        />
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                    navigator.clipboard.writeText(finalResult);
                                }}>
                                Retrieve Gap
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
