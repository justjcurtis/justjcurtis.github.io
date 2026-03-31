import { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import useDetectSound from "../hooks/useDetectSound";
import { COMMAND_IDX } from "../data/constants";

const maxLength = 1000;
const maxQrWidth = window.innerWidth - 100; // Adjusted for padding

export const GapStreamer = ({ data }) => {
    const [streaming, setStreaming] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const frameData = useRef("");
    const currentFrameRef = useRef(0);
    const hasEnded = useRef(false);
    const expected = useRef(0)
    const isPrev = useRef(false)

    function drawFrame() {
        if (data.length === 0) {
            endStream();
            return;
        }
        if (hasEnded.current) return
        const idx = currentFrameRef.current * maxLength;
        if (idx >= data.length) {
            endStream();
            return;
        }
        isPrev.current = false
        const nextFrame = data.slice(idx, idx + maxLength);
        frameData.current = nextFrame;
        currentFrameRef.current += 1;
        setCurrentFrame(currentFrameRef.current);
    }

    function drawPrevFrame() {
        if (data.length === 0) {
            endStream();
            return;
        }
        if (hasEnded.current || isPrev.current) return
        const idx = currentFrameRef.current * maxLength;
        if (idx >= data.length) {
            endStream();
            return;
        }
        isPrev.current = true
        const prevFrame = data.slice(idx - maxLength, idx);
        frameData.current = prevFrame;
        currentFrameRef.current -= 1;
        setCurrentFrame(currentFrameRef.current);
    }

    function endStream() {
        hasEnded.current = true;
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

    const updateExpected = () => {
        expected.current = +(!expected.current)
    }

    const onDetect = (index) => {
        if (index == expected.current && !streaming) {
            updateExpected()
            handleStartStreaming();
            drawFrame();
        } else if (index == expected.current) {
            updateExpected()
            drawFrame();
        } else if (index == COMMAND_IDX.PREV) {
            // drawPrevFrame()
        }
    }

    const { startListening, stopListening } = useDetectSound(onDetect, 50, 50);

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
