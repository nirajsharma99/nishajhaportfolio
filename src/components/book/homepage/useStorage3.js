import { useState, useEffect } from 'react';
import { storage, db, timeStamp } from '../../firebase/firebaseConfig';

const useStorage3 = ({ file, form }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const cache = Date.now();
    const storageRef = storage.ref(`reviews/${file.name}${cache}`);
    const collectionRef = db.collection('reviews');
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
          name: form.name,
          message: form.message,
          address: form.address,
        });
        setUrl(url);
      }
    );
  }, [file, form]);
  return { progress, url, error };
};
export default useStorage3;
