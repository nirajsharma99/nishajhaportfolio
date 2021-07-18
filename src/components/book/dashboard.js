import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase/firebaseConfig';
import ImageGrid from './imageGrid';
import Modal from './modal';
import ProgressBar from './progressBar';

function Dashboard() {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        history.push('/itsme');
      }
    });
    return unsubscribe;
  }, []);

  const fileType = ['image/png', 'image/jpeg'];
  const handleFile = (e) => {
    let pic = e.target.files[0];
    if (pic && fileType.includes(pic.type)) {
      setFile(pic);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file  (png or jpg)');
    }
  };

  return (
    <div className="dashboard-container">
      <span className="user-name">nisha jha.</span>
      <button className="logout-btn" onClick={() => auth.signOut()}>
        Sign out
      </button>
      <div className="text-center">
        <span className="name-font display-1">My book !!</span>
        <br />
      </div>
      <div className="text-center mt-3">
        <button
          className="add-buttons"
          onClick={() => history.push('/book/homepage')}
        >
          Add top arts
        </button>
        <button
          className="add-buttons"
          onClick={() => history.push('/book/inbox')}
        >
          Inbox
        </button>
      </div>
      <div className="d-block text-center ">
        <input ref={fileInputRef} type="file" onChange={handleFile} hidden />
        <button
          className="add-image-btn"
          onClick={() => fileInputRef.current.click()}
        >
          +
        </button>
      </div>
      <div className="result">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
      <ImageGrid setSelectedImg={setSelectedImg} collection="images" />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}
export default Dashboard;
