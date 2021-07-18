import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub =
      collection === 'images'
        ? db
            .collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
              let documents = [];
              snapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
              });
              setDocs(documents);
            })
        : db
            .collection(collection)
            .orderBy('createdAt', 'desc')
            .limit(6)
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
export default useFirestore;
