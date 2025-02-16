import Modal from "react-modal";
import React, { useState, useEffect, useRef } from 'react';

const Pause = ({isPaused,Home,Resume}) => {

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
            backgroundColor: '#fff', // 背景色の指定
        },
    };

    return (
        <Modal isOpen={isPaused} style={customStyles}>
          <div className="flex flex-col justify-center items-center space-y-4 p-6  rounded-md ">

            <button className="px-4 py-2 rounded-md font-bold" onClick={Resume}>再開</button>
            <button className="px-4 py-2 rounded-md font-bold"  onClick={Home}>終了</button>
    
          </div>
        </Modal>
      );
};

export default Pause;