import { useRef, useState, useEffect } from 'react';
import Compressor from 'compressorjs';
import { storage, db, timeStamp } from '../../firebase/firebaseConfig';
import { motion } from 'framer-motion';

function MyPic() {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentDP, setCurrentDP] = useState(null);

  useEffect(() => {
    db.collection('profile')
      .doc('dp')
      .get()
      .then((snap) => {
        setCurrentDP(snap.data().url);
      });
  });

  const fileType = ['image/png', 'image/jpeg'];
  const handleFile = (e) => {
    let pic = e.target.files[0];
    if (pic && fileType.includes(pic.type)) {
      new Compressor(pic, {
        quality: pic.size > 2097152 ? 0.4 : 0.8,
        success(result) {
          setFile(result);
          setError('');
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      setFile(null);
      setError('Please select an image file  (png or jpg)');
    }
  };

  useEffect(() => {
    //references
    if (file) {
      const cache = Date.now();
      const storageRef = storage.ref(`profile/${file.name}${cache}`);
      const collectionRef = db.collection('profile');
      storageRef.put(file).on(
        'state_changed',
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timeStamp();
          collectionRef.doc('dp').set({
            url: url,
            filename: file.name + '' + cache,
            createdAt: createdAt,
          });
          setFile(null);
        }
      );
    }
  }, [file]);

  return (
    <div className="d-flex justify-content-center  align-items-center flex-column">
      <div className="position-relative">
        <img
          src={currentDP}
          className=""
          alt="profile"
          width="400px"
          height="400px"
          style={{ borderRadius: '50%' }}
        />
        <button
          className="m-auto edit-btn"
          onClick={() => fileInputRef.current.click()}
        >
          <i class="far fa-edit"></i>
        </button>
      </div>
      {error && <div className="error">{error}</div>}

      <input ref={fileInputRef} onChange={handleFile} type="file" hidden />
      {file && (
        <div>
          <p className="text-start uploading-txt">Uploading...</p>
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
          ></motion.div>
        </div>
      )}
    </div>
  );
}
export default MyPic;
