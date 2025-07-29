import { useState } from 'react';
import { GapStreamer } from '../gapStreamer';
import { GapDecoder } from '../gapDecoder';

export const GapPage = () => {
    const [text, setText] = useState("");
    const [showStreamer, setShowStreamer] = useState(false);
    const [showDecoder, setShowDecoder] = useState(false);

    const handleTextSubmit = () => {
        setShowStreamer(true);
    };

    return (
        <>
            {showDecoder && <GapDecoder />}
            {showStreamer && <GapStreamer data={text} />}
            {!showStreamer && !showDecoder &&
                <div className="flex-1 flex flex-col items-center justify-center p-8 select-none" >
                    <div className="w-full max-w-2xl">
                        <h1 className="text-4xl font-bold text-center mb-8">This page is a work in progress!</h1>
                        <p className="text-lg text-center mb-8">Please check back later.</p>

                        <div className="bg-black rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Text Byte Counter</h2>
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                <div>
                                    <label htmlFor="textInput" className="block text-sm font-medium text-gray-400 mb-2">
                                        Enter your text:
                                    </label>
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
                                        Characters: {text.length}
                                    </span>
                                    <div className="text-sm text-gray-400 flex">
                                        <button
                                            type="button"
                                            onClick={handleTextSubmit}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        >
                                            Stream Gap
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowDecoder(true)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ml-2"
                                        >
                                            Decode Gap
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </>
    );
}

