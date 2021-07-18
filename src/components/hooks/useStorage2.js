import { useState, useEffect } from 'react';
import { storage, db, timeStamp } from '../firebase/firebaseConfig';

const useStorage2 = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const cache = Date.now();
    const storageRef = storage.ref(`toparts/${file.name}${cache}`);
    const collectionRef = db.collection('toparts');
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
        collectionRef.add({
          url: url,
          filename: file.name + '' + cache,
          createdAt: createdAt,
          count: 0,
        });
        setUrl(url);
      }
    );
  }, [file]);
  return { progress, url, error };
};
export default useStorage2;
