import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import useDetectSound from "../hooks/useDetectSound";
import { STOP_CODE } from "../data/constants";

const maxLength = 1000;
const maxQrWidth = window.innerWidth - 100; // Adjusted for padding

export const GapStreamer = ({ data }) => {
    const [streaming, setStreaming] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const frameData = useRef("");
    const currentFrameRef = useRef(0);
    const hasSendEndFrame = useRef(false);

    function drawFrame() {
        if (data.length === 0) {
            endStream();
            return;
        }
        const idx = currentFrameRef.current * maxLength;
        if (idx >= data.length) {
            if (hasSendEndFrame.current) {
                endStream();
            }
            nextFrame = STOP_CODE
            frameData.current = nextFrame;
            hasSendEndFrame.current = true;
            setCurrentFrame(prev => prev + 1);
            return;
        }
        const nextFrame = data.slice(idx, idx + maxLength);
        frameData.current = nextFrame;
        currentFrameRef.current += 1;
        setCurrentFrame(currentFrameRef.current);
    }

    function endStream() {
        setStreaming(false);
        setCurrentFrame(0);
        currentFrameRef.current = 0;
    }


    const handleStartStreaming = () => {
        if (!data || data.length === 0) {
            console.error("No data to stream");
            return;
        }
        // Reset frame data and counter
        frameData.current = "";
        currentFrameRef.current = 0;
        setCurrentFrame(0);

        setStreaming(true);
    }
    const onDetect = (volume) => {
        if (!streaming) {
            handleStartStreaming();
            drawFrame();
        } else {
            drawFrame();
        }
    }

    const { startListening, stopListening } = useDetectSound(onDetect, 50, 100);

    // Start listening when component mounts
    useEffect(() => {
        startListening();
        return () => {
            stopListening();
        };
    }, []);

    return (
        <div className="flex flex-col items-center space-y-4 mt-40">
            {/* Sound detection status */}
            {!streaming && (
                <button
                    onClick={handleStartStreaming}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={!data || data.length === 0}
                >
                    Start Streaming
                </button>
            )}
            {streaming && frameData.current.length > 0 && (
                <div className="flex flex-col items-center space-y-4 bg-white z-10 p-4">
                    <div className="text-sm text-blue-600 mb-2">
                        Frame {currentFrame} - Make a sound to advance
                    </div>
                    <QRCode
                        title="GapStreamer QR Code"
                        value={frameData.current}
                        size={Math.min(maxQrWidth, 512)} // Limit QR code size

                    />
                </div>
            )}
            {!streaming && currentFrame > 0 && (
                <div className="text-sm text-green-600">
                    Streaming completed! Streamed {currentFrame} frames
                </div>
            )}
        </div>
    );
}
