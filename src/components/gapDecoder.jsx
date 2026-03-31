import { useState, useEffect, useRef } from 'react';
import { cycle, playBeep } from '../utils/helpers';
import { Scanner } from '@yudiel/react-qr-scanner';
import { COMMANDS } from '../data/constants';

let timeout = null;
const debouncedBeep = (freq) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        playBeep(freq);
    }, 100);
}
export const GapDecoder = () => {
    const lastResult = useRef("");
    let finalResult = useRef("");
    const lastResultTimestamp = useRef(null);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef(null);
    const isSleeping = useRef(false);
    const lastRepeatPlayed = useRef(null);
    const currentCommand = useRef(COMMANDS.NEXT_A);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const handleResult = async (text) => {
        if (isFinished || isSleeping.current) return;
        const now = Date.now();
        if (text === lastResult.current) {
            if (lastResultTimestamp.current && (now - lastResultTimestamp.current) > 500) {
                if (!lastRepeatPlayed.current || now - lastRepeatPlayed.current > 500) {
                    debouncedBeep(currentCommand.current);
                }
            }
            return; // Ignore duplicate results
        }
        if (lastResultTimestamp.current && (now - lastResultTimestamp.current) < 300) {
            return; // Ignore results that come too quickly
        }
        isSleeping.current = true;
        lastResult.current = text;
        lastResultTimestamp.current = now;
        finalResult.current += text;
        currentCommand.current = cycle(currentCommand.current, [COMMANDS.NEXT_A, COMMANDS.NEXT_B]);
        debouncedBeep();
        await sleep(100);
        isSleeping.current = false;
        if (text.length < 1000) {
            setIsFinished(true);
            debouncedBeep(currentCommand.current);
        }
    }

    const init = () => {
        let interval
        interval = setInterval(() => {
            if (!lastResultTimestamp.current) {
                debouncedBeep(currentCommand.current);
                return
            }
            currentCommand.current = cycle(currentCommand.current, [COMMANDS.NEXT_A, COMMANDS.NEXT_B]);
            clearInterval(interval)

        }, 500)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className="flex-1 flex items-center justify-center select-none">
            <div className="bg-neutral rounded-lg shadow-lg p-6 max-w-2xl w-full">
                {!isFinished &&
                    <>
                        <Scanner
                            sound={false}
                            allowMultiple={true}
                            scanDelay={300}
                            constraints={{ facingMode: 'environment' }}
                            onScan={(result) => handleResult(result[0].rawValue)} />
                        <div className="text-center mt-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                    setIsFinished(true);
                                    clearInterval(intervalRef.current);
                                }}>
                                Collapse Gap {currentCommand.current == COMMANDS.NEXT_A ? "A" : "B"}
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
                            defaultValue={finalResult.current}
                            className="w-full h-40 p-3 border border-gray-300 rounded-md resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={6}
                        />
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                    navigator.clipboard.writeText(finalResult.current);
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
