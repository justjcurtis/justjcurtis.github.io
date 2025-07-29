import React from 'react';
import useDetectSound from '../hooks/useDetectSound';

const SoundDetectionTest = () => {
    const {
        isListening,
        currentVolume,
        isDetecting,
        error,
        hasPermission,
        startListening,
        stopListening
    } = useDetectSound({
        threshold: 30, // Lower threshold for easier testing
        onDetect: (volume) => {
            console.log('Sound detected! Volume:', volume);
            alert(`Sound detected! Volume: ${volume}`);
        },
        duration: 500, // 500ms duration
        sensitivity: 2 // Higher sensitivity
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Sound Detection Test</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={startListening}
                    disabled={isListening}
                    style={{ 
                        padding: '10px 20px', 
                        marginRight: '10px',
                        backgroundColor: isListening ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isListening ? 'not-allowed' : 'pointer'
                    }}
                >
                    Start Listening
                </button>
                
                <button 
                    onClick={stopListening}
                    disabled={!isListening}
                    style={{ 
                        padding: '10px 20px',
                        backgroundColor: !isListening ? '#ccc' : '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: !isListening ? 'not-allowed' : 'pointer'
                    }}
                >
                    Stop Listening
                </button>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <strong>Status:</strong> {isListening ? 'Listening' : 'Not Listening'}
            </div>
            
            <div style={{ marginBottom: '10px' }}>
                <strong>Permission:</strong> {
                    hasPermission === null ? 'Unknown' :
                    hasPermission ? 'Granted' : 'Denied'
                }
            </div>
            
            <div style={{ marginBottom: '10px' }}>
                <strong>Current Volume:</strong> {currentVolume}
            </div>
            
            <div style={{ marginBottom: '10px' }}>
                <strong>Detecting:</strong> {isDetecting ? 'YES' : 'NO'}
            </div>

            {error && (
                <div style={{ 
                    color: 'red', 
                    backgroundColor: '#ffebee', 
                    padding: '10px', 
                    borderRadius: '4px',
                    marginTop: '10px'
                }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '4px'
            }}>
                <h3>Volume Meter</h3>
                <div style={{ 
                    width: '100%', 
                    height: '20px', 
                    backgroundColor: '#ddd',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{ 
                        width: `${currentVolume}%`, 
                        height: '100%', 
                        backgroundColor: currentVolume > 30 ? '#4CAF50' : '#2196F3',
                        transition: 'width 0.1s ease'
                    }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
                    {currentVolume}%
                </div>
            </div>

            <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                backgroundColor: '#e3f2fd', 
                borderRadius: '4px'
            }}>
                <h3>Instructions:</h3>
                <ol>
                    <li>Click "Start Listening" to begin sound detection</li>
                    <li>Grant microphone permission when prompted</li>
                    <li>Make some noise (clap, speak, tap) to test detection</li>
                    <li>Watch the volume meter and detection status</li>
                    <li>When volume stays above 30% for 500ms, you'll get an alert</li>
                </ol>
            </div>
        </div>
    );
};

export default SoundDetectionTest;

