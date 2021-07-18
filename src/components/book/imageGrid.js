import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { db, storage } from '../firebase/firebaseConfig';

const ImageGrid = ({ setSelectedImg, collection }) => {
  const { docs } = useFirestore(collection);

  const handleClick = (e, url) => {
    if (e.target.classList.contains('expand-img')) {
      setSelectedImg(url);
    }
  };

  const deleteImage = (id, filename) => {
    db.collection(collection).doc(id).delete();
    storage.ref(`${collection}/${filename}`).delete();
  };

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            onClick={(e) => handleClick(e, doc.url)}
          >
            <motion.img
              src={doc.url}
              className="expand-img"
              alt={'gallery-pictures-' + doc.filename}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <div className="options">
              <button className="like" disabled>
                <i className="fas fa-heart"></i>
                <span className="count">{doc.count}</span>
              </button>
              <button
                className="delete"
                onClick={() => deleteImage(doc.id, doc.filename)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </motion.div>
        ))}
    </div>
  );
};
export default ImageGrid;
