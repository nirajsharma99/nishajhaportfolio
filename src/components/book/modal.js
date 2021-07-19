import { motion } from 'framer-motion';
import { db, storage } from '../firebase/firebaseConfig';

const Modal = ({ selectedImg, setSelectedImg, collection }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };
  const deleteImage = (id, filename) => {
    db.collection(collection).doc(id).delete();
    storage.ref(`${collection}/${filename}`).delete();
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
      <div className="position-relative">
        <motion.img
          src={selectedImg.url}
          alt="enlarged pic"
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
        />
        <button
          className="modal-delete"
          onClick={() => {
            deleteImage(selectedImg.id, selectedImg.filename);
            setSelectedImg(null);
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </motion.div>
  );
};
export default Modal;
