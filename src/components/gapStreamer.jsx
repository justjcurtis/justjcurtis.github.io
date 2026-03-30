import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import useDetectSound from "../hooks/useDetectSound";

const maxLength = 1000;
const maxQrWidth = window.innerWidth - 100; // Adjusted for padding

export const GapStreamer = ({ data }) => {
    const [streaming, setStreaming] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const frameData = useRef("");
    const currentFrameRef = useRef(0);

    function drawFrame() {
        if (data.length === 0) {
            endStream();
            return;
        }
        const idx = currentFrameRef.current * maxLength;
        if (idx >= data.length) {
            endStream();
            return;
        }
        const nextFrame = data.slice(idx, idx + maxLength);
        frameData.current = nextFrame;
        currentFrameRef.current += 1;
        setCurrentFrame(currentFrameRef.current);
    }

    function endStream() {
        setStreaming(false);
        frameData.current = "";
        setTimeout(() => {
            stopListening();
        }, 1000);
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

    const { startListening, stopListening } = useDetectSound(onDetect, 30, 100);

    // Start listening when component mounts
    useEffect(() => {
        startListening();
        return () => {
            stopListening();
        };
    }, []);

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Sound detection status */}
            {!streaming && currentFrame == 0 && (
                <div className="text-sm text-gray-600 mb-2">
                    Waiting for receiver to start...
                </div>
            )}
            {streaming && frameData.current.length > 0 && (
                <div className="flex flex-col items-center space-y-4 bg-white z-10 p-4">
                    <QRCode
                        title="GapStreamer QR Code"
                        value={frameData.current}
                        size={Math.min(maxQrWidth, 512)} // Limit QR code size

                    />
                </div>
            )}
            {!streaming && currentFrame > 0 && (
                <div className="text-sm text-green-600">
                    Gapped!
                </div>
            )}
        </div>
    );
}
