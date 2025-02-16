import Modal from "react-modal";
import React, { useState, useEffect, useRef } from 'react';

const TimeLimit = ({ ModalLimitOpen, timeLimit, setTimeLimit, Mode, setMode, userid, handleConvert, setModeTimed, modetimed }) => {

    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [isConvertAllowed, setisConvertAllowed] = useState(false);
    
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            minHeight: '40%',
            minWidth: '40%',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#fff',
        },
    };


    useEffect(() => {

        if (isConvertAllowed) {
            handleConvert();
            setisConvertAllowed(false);
        }

    }, [timeLimit]);

    const timed = () => {
        setMode(false);
        setModeTimed(true);
    };

    const handleTimedSubmit = (e) => {
        e.preventDefault();
        try {
            const timeLimitInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
            // const response = await axios.post('/api/time-limit', { timeLimit: timeLimitInSeconds, userid: userid });
            setTimeLimit(timeLimitInSeconds);
            setisConvertAllowed(true);
        } catch (error) {
            console.error('There was an error saving the time limit!', error);
        }
    };

    const handleunlimitedSubmit = () => {
        try {
            const timeLimitInSeconds = parseInt(0) * 60 + parseInt(0);
            // const response = await axios.post('/api/time-limit', { timeLimit: timeLimitInSeconds, userid: userid });
            setTimeLimit(timeLimitInSeconds);
            setisConvertAllowed(true);
        } catch (error) {
            console.error('There was an error saving the time limit!', error);
        }

    };


    const handle1minutesSubmit = () => {
        try {
            const timeLimitInSeconds = parseInt(1) * 60 + parseInt(0);
            // const response = await axios.post('/api/time-limit', { timeLimit: timeLimitInSeconds, userid: userid });
            setTimeLimit(timeLimitInSeconds);
            setisConvertAllowed(true);
        } catch (error) {
            console.error('There was an error saving the time limit!', error);
        }

    };

    return (

        <Modal isOpen={ModalLimitOpen} style={customStyles}>
            {Mode &&
                <div className="flex flex-col justify-center items-center space-y-4 p-6  rounded-md ">

                    <button
                        onClick={handleunlimitedSubmit}
                        className="px-4 py-2 rounded-md font-bold"
                    >
                        無制限タイピング
                    </button>

                    <button
                        onClick={handle1minutesSubmit}
                        className="px-4 py-2 rounded-md font-bold"
                    >
                        １分間タイピング
                    </button>

                    <button
                        onClick={timed}
                        className="px-4 py-2 rounded-md font-bold"
                    >
                        時間制限タイピング
                    </button>

                </div>
            }



            {modetimed && (
                <form onSubmit={handleTimedSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            時間設定
                        </label>
                        <div className="mt-1 flex space-x-2">
                            <input
                                type="number"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                placeholder="Minutes"
                                min={0}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <span className="self-center text-gray-700">:</span>
                            <input
                                type="number"
                                value={seconds}
                                onChange={(e) => setSeconds(e.target.value)}
                                placeholder="Seconds"
                                max={59}
                                min={0}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        start
                    </button>
                    <button
                        onClick={() => {
                            setModeTimed(false);
                            setMode(true);
                        }}
                        className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        戻る
                    </button>
                </form>
            )}

        </Modal>

    );
};

export default TimeLimit;