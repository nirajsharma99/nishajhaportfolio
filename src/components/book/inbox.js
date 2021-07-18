import { auth } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import TimeFormat from './timeformat';

function Inbox() {
  const history = useHistory();
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        history.push('/itsme');
      }
    });
    return unsubscribe;
  }, []);

  const deleteMessage = (id) => {
    db.collection('inbox')
      .doc(id)
      .delete()
      .then(() => console.log('message deleted'))
      .catch((err) => console.log(err));
  };
  const handleStar = (id, starred) => {
    db.collection('inbox').doc(id).update({ starred: !starred });
  };

  useEffect(() => {
    const unsubs = db
      .collection('inbox')
      .orderBy('date', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsubs();
  }, []);

  function ExpandMessage({ doc }) {
    return (
      <div>
        <div className="msg-content position-relative">
          <span>
            Name:<span className="fw-bold ms-3">{doc.name}</span>
          </span>
          <span>
            Email:<span className="ms-3 fw-bold">{doc.email}</span>
          </span>
          {doc.reference && (
            <span className="text-break">
              Reference:
              <a href={doc.reference} className="ms-3 ">
                {doc.reference}
              </a>
            </span>
          )}
          <span className="text-break">
            Message:
            <span className="ms-3">{doc.message}</span>
          </span>
          <button
            className="delete position-absolute me-0"
            style={{ bottom: 0, right: '-30px' }}
            onClick={() => deleteMessage(doc.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  }
  function InboxHeader({ doc }) {
    const [expand, setExpand] = useState(false);
    return (
      <div className="inbox-outer">
        <div className="inbox-header w-100">
          <button
            className={
              'star ' + (doc.starred ? 'text-secondary' : 'text-warning')
            }
            onClick={() => handleStar(doc.id, doc.starred)}
          >
            <i className="fas fa-star"></i>
          </button>
          <span className="visitor-name">{doc.name}</span>
          <span className="visitor-email ms-2">&lt;{doc.email}&gt;</span>
          <span className="timestamp">{TimeFormat(doc.date)}</span>
          <button className="expand-msg" onClick={() => setExpand(!expand)}>
            {expand ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </button>
        </div>
        {expand && <ExpandMessage doc={doc} />}
      </div>
    );
  }

  return (
    <div className="inbox-container">
      <span className="user-name">nisha jha.</span>
      <button className="logout-btn" onClick={() => auth.signOut()}>
        Sign out
      </button>
      <div className="text-center">
        <span className="name-font display-1">Inbox</span>
        <br />
      </div>

      {docs.map((doc) => (
        <InboxHeader doc={doc} key={doc.id} />
      ))}
    </div>
  );
}
export default Inbox;
