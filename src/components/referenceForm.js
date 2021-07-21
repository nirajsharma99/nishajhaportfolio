import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { db, timeStamp } from './firebase/firebaseConfig';
import emailjs from 'emailjs-com';
import Loader2 from './loader/loader2';
const {
  REACT_APP_EMAILJS_SERVICE_ID,
  REACT_APP_REFER_TEMPLATE_ID,
  REACT_APP_EMAILJS_USER_ID,
} = process.env;

function ReferenceForm({ reference, setRefer }) {
  emailjs.init(REACT_APP_EMAILJS_USER_ID);
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [flash, setFlash] = useState({ show: false, error: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = () => {
    if (form.name && form.message && form.email) {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      var validEmail = emailPattern.test(form.email);
      if (validEmail) {
        setLoader(true);
        const date = timeStamp();
        const collectionRef = db.collection('inbox');
        collectionRef
          .add({
            reference: reference,
            name: form.name,
            email: form.email,
            message: form.message,
            received: date,
            date: Date.now(),
            starred: false,
          })
          .then(() => {
            setLoader(false);
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
            setFlash({ ...flash, show: false });
          })
          .catch(() => setFlash({ show: true, error: 'An error has occured' }));

        var templateParams = {
          to: 'Nisha Jha',
          from: form.name,
          email: form.email,
          message: form.message,
          reference: reference,
        };
        emailjs
          .send(
            REACT_APP_EMAILJS_SERVICE_ID,
            REACT_APP_REFER_TEMPLATE_ID,
            templateParams
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      } else {
        setFlash({ show: true, error: 'Please enter a valid email.' });
      }
    } else {
      setFlash({ show: true, error: 'Please fill all the fields!' });
    }
  };
  return (
    <div className="refer-form-anim">
      <div className="contact-div">
        <button className="referClose" onClick={() => setRefer(false)}>
          <i className="fas fa-times"></i>
        </button>
        <div className="fields text-center">
          {flash.show && (
            <span className="flash text-danger">{flash.error}</span>
          )}
          <div className="name-input">
            <input
              type="text"
              className="user-input"
              value={reference}
              readOnly
            />
          </div>
          <div className="name-input">
            <input
              type="text"
              className="user-input"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="email">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path
                fill="#999"
                d="M16.999,4.975L16.999,4.975C16.999,4.975,16.999,4.975,16.999,4.975c-0.419-0.4-0.979-0.654-1.604-0.654H4.606c-0.584,0-1.104,0.236-1.514,0.593C3.076,4.928,3.05,4.925,3.037,4.943C3.034,4.945,3.035,4.95,3.032,4.953C2.574,5.379,2.276,5.975,2.276,6.649v6.702c0,1.285,1.045,2.329,2.33,2.329h10.79c1.285,0,2.328-1.044,2.328-2.329V6.649C17.724,5.989,17.441,5.399,16.999,4.975z M15.396,5.356c0.098,0,0.183,0.035,0.273,0.055l-5.668,4.735L4.382,5.401c0.075-0.014,0.145-0.045,0.224-0.045H15.396z M16.688,13.351c0,0.712-0.581,1.294-1.293,1.294H4.606c-0.714,0-1.294-0.582-1.294-1.294V6.649c0-0.235,0.081-0.445,0.192-0.636l6.162,5.205c0.096,0.081,0.215,0.122,0.334,0.122c0.118,0,0.235-0.041,0.333-0.12l6.189-5.171c0.099,0.181,0.168,0.38,0.168,0.6V13.351z"
              ></path>
            </svg>
            <input
              type="email"
              className="email-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="message">
            <textarea
              className="message-input"
              placeholder="Enter your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            className={submitted ? 'active-btn' : 'submit-btn'}
            onClick={handleSubmit}
          >
            <span>{submitted ? 'Thanks' : 'Submit'}</span>
            <div className="check-box">
              <svg className="svg-icon tick" viewBox="0 0 20 20">
                <path
                  fill="transparent"
                  fillOpacity="0.1"
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                ></path>
              </svg>
            </div>
            {loader && <Loader2 />}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReferenceForm;
