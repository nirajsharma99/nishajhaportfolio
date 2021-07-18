import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';

const ReviewFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsub = db
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .limit(3)
      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);
  return { docs };
};
export default ReviewFirestore;
