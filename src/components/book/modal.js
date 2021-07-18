import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };
  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="close-img">
        <button onClick={() => setSelectedImg(null)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};
export default Modal;
