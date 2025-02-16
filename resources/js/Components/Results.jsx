import React, { useState, useEffect } from 'react';
import Modal from "react-modal";

const Results = ({ Restart, Home, texts, mistakes, result, TypingTime }) => {


  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //     minHeight: '40%',
  //     minWidth: '40%',
  //     padding: '20px',
  //     borderRadius: '8px',
  //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  //     backgroundColor: '#fff', // 背景色の指定
  //   },
  // };

  const customStyles = {
    content: {
      display: 'flex',
      flexDirection: 'column', // 上下に並べる
      justifyContent: 'center', // 垂直方向に中央寄せ
      alignItems: 'center', // 水平方向に中央寄せ
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '1000px', // モーダルの最大幅
      margin: 'auto', // 横方向に中央寄せ
      backgroundColor: '#fff',
    },
  };

  // const calculateWPM = (startTime, endTime, texts, PausedTime) => {
  //   const durationInMinutes = ( (endTime - startTime) + PausedTime ) / 60000;
  //   console.log(PausedTime);
  //   console.log((endTime - startTime) + PausedTime);
  //   console.log(endTime - startTime);

  //   return Math.round(texts / durationInMinutes);
  // };

  // const wpm = startTime && endTime ? calculateWPM(startTime, endTime, texts, PausedTime) : null;


  return (
    <Modal isOpen={result} style={customStyles}>

      <div className="flex items-center justify-center p-5">
        <div>
          <p className="text-center mb-1">\ がんばった! /</p>
          <img src="images\chara01.png" alt="Chara1" className="w-40 mx-8" />
        </div>
        <div className="flex-grow text-center mx-8">
          <p className="text-lg mb-2 font-bold">かかった時間: {`${Math.floor(TypingTime / 60)}分${TypingTime % 60}秒`}</p>
          <p className="text-lg mb-2 font-bold">タイプ数: {texts}</p>
          <p className="text-lg mb-4 font-bold">ミス: {mistakes}</p>
          <button className=" py-2 px-4 rounded mr-2 font-bold" onClick={Restart}>もう一度タイピングする</button>
          <button className=" py-2 px-4 rounded font-bold" onClick={Home}>ホームに戻る</button>
        </div>
        <div>
          <p className="text-center mb-1">\ おつかれさま! /</p>
          <img src="images\chara02.png" alt="Character 2" className="w-32 mx-8" />
        </div>
      </div>
    </Modal>
  );
};

export default Results;