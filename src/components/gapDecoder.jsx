import { useState, useEffect, useRef } from 'react';
import { cycle, playBeep } from '../utils/helpers';
import { Scanner } from '@yudiel/react-qr-scanner';
import { COMMANDS, QR_MAX } from '../data/constants';

const BEEP_DELAY = 250

let timeout = null;

const debouncedBeep = (freq, ms = 150, len = 80) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        playBeep(freq, len);
    }, ms);
}

const decodeCompressedString = async (compressed) => {
    const binary = atob(compressed);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    const ds = new DecompressionStream('deflate');
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    return await new Response(ds.readable).text();
}

export const GapDecoder = () => {
    const lastResult = useRef("");
    let finalResult = useRef("");
    const [isFinished, setIsFinished] = useState(false);
    const lastPlayed = useRef(Date.now());
    const currentCommand = useRef(COMMANDS.NEXT_A);
    const initialised = useRef(false);
    const [decoded, setDecoded] = useState("")

    useEffect(() => {
        if (isFinished && finalResult.current) {
            decodeCompressedString(finalResult.current).then(result => {
                setDecoded(result)
            })
        }
    }, [isFinished])

    const handleResult = async (text) => {
        if (isFinished) return;
        const now = Date.now();
        if (text === lastResult.current) {
            if (!lastPlayed.current || now - lastPlayed.current > BEEP_DELAY) {
                debouncedBeep(currentCommand.current);
                lastPlayed.current = now;
            }
            return; // Ignore duplicate results
        }
        lastResult.current = text;
        finalResult.current += text;
        currentCommand.current = cycle(currentCommand.current, [COMMANDS.NEXT_A, COMMANDS.NEXT_B]);
        debouncedBeep();
        lastPlayed.current = now;
        if (text.length < QR_MAX) {
            setIsFinished(true);
            debouncedBeep(currentCommand.current, BEEP_DELAY);
        }
    }

    const init = () => {
        if (initialised.current) return;
        initialised.current = true;
        let interval
        interval = setInterval(() => {
            if (!lastResult.current) {
                lastPlayed.current = Date.now();
                debouncedBeep(currentCommand.current);
                return
            }
            clearInterval(interval)

        }, (BEEP_DELAY * 4) / 3)
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
                            scanDelay={50}
                            constraints={{ facingMode: 'environment' }}
                            onScan={(result) => handleResult(result[0].rawValue)} />
                        <div className="text-center mt-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                    lastResult.current = " ";
                                    setIsFinished(true);
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
                            defaultValue={decoded}
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
