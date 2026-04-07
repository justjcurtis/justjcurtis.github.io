import { useRef, useState, useEffect } from "react";
import useDetectSound from "../hooks/useDetectSound";
import { COMMAND_IDX, QR_MAX, QR_END_MARKER } from "../data/constants";
import { QRByteSvg } from "./qrCode";
import { motion as m } from "framer-motion";


const stringToBytes = (str) => new TextEncoder().encode(str)

const getCompressedString = async (data) => {
    const bytes = stringToBytes(data);
    const cs = new CompressionStream('deflate')
    const writer = cs.writable.getWriter()
    writer.write(bytes)
    writer.close()
    const buff = await new Response(cs.readable).arrayBuffer()
    const compressed = new Uint8Array(buff);
    let binary = "";
    compressed.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}


export const GapStreamer = ({ data }) => {
    const compressedDataRef = useRef(null);
    const [streaming, setStreaming] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const frameData = useRef("");
    const currentFrameRef = useRef(0);
    const hasEnded = useRef(false);
    const expected = useRef(0)
    const isPrev = useRef(false)
    const startTime = useRef(null);
    const qrLength = useRef(QR_MAX);

    const getQRSize = () => {
        let result = Math.min(window.innerWidth - 50, window.innerHeight - 120);
        if (!streaming) {
            if (result < 600 && result >= 400) {
                qrLength.current = 2000;
            } else if (result < 400 && result >= 350) {
                qrLength.current = 1000;
            } else if (result < 350) {
                qrLength.current = 600;
            } else {
                qrLength.current = QR_MAX;
            }
        }
        return result;
    }

    const [qrSize, setQrSize] = useState(getQRSize());

    useEffect(() => {
        const el = window.addEventListener("resize", () => {
            setQrSize(getQRSize())
        })
        return () => {
            window.removeEventListener("resize", el)
        }
    }, [])

    useEffect(() => {
        const prepareData = async () => {
            compressedDataRef.current = await getCompressedString(data);
        }
        prepareData();
    }, [data]);

    function drawFrame() {
        if (data.length === 0) {
            endStream();
            return;
        }
        if (hasEnded.current) return
        const idx = currentFrameRef.current * qrLength.current;
        if (idx >= compressedDataRef.current.length) {
            endStream();
            return;
        }
        isPrev.current = false
        let nextFrame = compressedDataRef.current.slice(idx, idx + qrLength.current);
        nextFrame = currentFrameRef.current + "#" + nextFrame
        const isLastFrame = nextFrame.length < qrLength.current;
        if (isLastFrame) {
            // add end marker to last frame so decoder knows when to stop
            nextFrame += QR_END_MARKER;
        }
        frameData.current = nextFrame;
        currentFrameRef.current += 1;
        setCurrentFrame(currentFrameRef.current);
    }

    function drawPrevFrame() {
        if (data.length === 0) {
            endStream();
            return;
        }
        if (!currentFrame.current || isPrev.current) return
        const idx = currentFrameRef.current * qrLength.current;
        if (idx >= compressedDataRef.current.length) {
            endStream();
            return;
        }
        isPrev.current = true
        let prevFrame = compressedDataRef.current.slice(idx - QR_MAX, idx);
        prevFrame = (currentFrameRef.current - 1) + "#" + prevFrame
        frameData.current = prevFrame;
        currentFrameRef.current -= 1;
        setCurrentFrame(currentFrameRef.current);
    }

    function endStream() {
        startTime.current = Date.now() - startTime.current;
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
            if (!startTime.current) {
                startTime.current = Date.now();
            }
            updateExpected()
            drawFrame();
        } else if (index == COMMAND_IDX.PREV) {
            drawPrevFrame()
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
                <div className="flex flex-col items-center space-y-4 bg-white z-10 p-2">
                    <QRByteSvg
                        data={frameData.current}
                        size={qrSize}
                    />
                </div>
            )}
            {!streaming && currentFrame > 0 && (
                <div className="text-sm text-green-600 text-center">
                    <m.p
                        className="mt-2"
                        initial={{ opacity: 0, fontSize: "0.5rem", y: 10 }}
                        animate={{ opacity: 1, fontSize: "1rem", y: 0 }}
                        transition={{ delay: 0, duration: 0.3 }}
                    >
                        Gapped!
                    </m.p>
                    <m.hr
                        className="border-green-400 my-1 justify-self-center"
                        initial={{ width: 0 }}
                        animate={{ width: "100vw" }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeIn" }}
                    />
                    <m.p
                        className="mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                    >
                        {data.length > 1000 ? (data.length / 1000).toFixed(2) : data.length} {data.length > 1000 ? "KB" : "Bytes"}
                    </m.p>
                    {startTime.current > 1 && (
                        <>
                            <m.p
                                className="mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.4, duration: 0.5 }}
                            >
                                {startTime.current ? `Time: ${(startTime.current / 1000).toFixed(2)}s` : ""}
                            </m.p>
                            <m.p
                                className="mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.1, duration: 0.5 }}
                            >
                                {(((data.length * 8) / (startTime.current / 1000)) / 1000).toFixed(2)} Kbps
                            </m.p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
