import mandala from '.././m2.png';
import clientpic from '.././clientpic/clientpic3.jpeg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
//import { db } from './firebase/firebaseConfig';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const Info = ({ forwardedRef }) => {
  /*const [current, setCurrent] = useState(null);
  useEffect(() => {
    db.collection('profile')
      .doc('dp')
      .get()
      .then((snap) => {
        setCurrent(snap.data().url);
      });
  });*/
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div>
      &nbsp;
      <div ref={forwardedRef} className="info-outer">
        <div className="info-container">
          <div className="mandala-holder">
            <img src={mandala} alt="mandala" className="mandala" />
          </div>
          <div className="info-about">
            <h2 className="d-flex flex-column">
              <div className="overflow-hidden">
                <span className="hi">Hi i'm</span>
              </div>
              <div className="overflow-hidden">
                <p className="name">Nisha jha</p>
              </div>
              <div className="overflow-hidden">
                <span className="normal-text">&amp;</span>
              </div>
              <div className="overflow-hidden">
                <span className="normal-text">
                  I'm an <span className="name">artist</span>
                </span>
              </div>
            </h2>
          </div>
          <div className="client-image-div">
            <img src={clientpic} className="client-pic" alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
