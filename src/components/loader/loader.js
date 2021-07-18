import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lottie/circular.json';

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid ',
    },
  };
  return (
    <div
      className="position-absolute"
      style={{
        zIndex: 1001,
        background: 'rgba(255,255,255,0.9)',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Lottie options={defaultOptions} height={'400px'} width={'400px'} />
    </div>
  );
};
export default Loader;
