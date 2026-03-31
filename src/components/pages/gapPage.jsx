import { useState } from 'react';
import { GapStreamer } from '../gapStreamer';
import { GapDecoder } from '../gapDecoder';
import { StarryNight } from '../starryNight';

export const GapPage = () => {
    const [text, setText] = useState("");
    const [showStreamer, setShowStreamer] = useState(false);
    const [showDecoder, setShowDecoder] = useState(false);

    const handleTextSubmit = () => {
        if (!text.trim()) {
            setShowDecoder(true);
            return;
        }
        setShowStreamer(true);
    };

    return (
        <StarryNight>
            <div className="z-50 relative flex flex-col items-center justify-center min-h-screen">
                <div className="flex w-screen overflow-hidden items-center justify-center">
                    {showDecoder && <GapDecoder />}
                    {showStreamer && <GapStreamer data={text} />}
                </div>
                {!showStreamer && !showDecoder &&
                    <div className='flex w-screen h-screen'>
                        <div className="flex-1  flex flex-col items-center justify-center p-8 select-none" >
                            <div className="w-full max-w-2xl">
                                <h1 className="text-4xl font-bold text-center mb-8">GAP!</h1>
                                <p className="text-lg text-center mb-8">cross the gap.</p>

                                <div className="bg-neutral-800 rounded-lg shadow-lg p-6 w-full flex-1">
                                    <h2 className="text-2xl font-semibold mb-4">Fill the gap</h2>
                                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                        <div>
                                            <textarea
                                                id="textInput"
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                placeholder="Type or paste your text here..."
                                                className="w-full h-40 p-3 border border-gray-600 rounded-md resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                rows={6}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">
                                                {text.length > 0 ? `# ${text.length}` : "  "}
                                            </span>
                                            <div className="text-sm text-gray-400 flex">
                                                <button
                                                    type="button"
                                                    onClick={handleTextSubmit}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Jump Gap
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </div >
                }
            </div >
        </StarryNight >
    );
}

