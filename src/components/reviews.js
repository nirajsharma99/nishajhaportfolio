import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import ReviewFirestore from './book/homepage/reviewFirestore';

function Reviews({ forwardedRef }) {
  const { docs } = ReviewFirestore('reviews');
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  function ReadMore({ children, maxCharacterCount = 130 }) {
    const text = children.trim();
    const [readMore, setReadmore] = useState(false);
    const resultString = readMore ? text : text.slice(0, maxCharacterCount);

    return (
      <>
        <p className={'mb-0 review-txt'}>
<<<<<<< HEAD
          {resultString.trim() +
            (resultString.length === maxCharacterCount ? '...' : '')}
=======
          {resultString.trim() + (resultString.length === maxCharacterCount ? '...' : '')}
        </p>}
>>>>>>> ed25a59a59a6f6b9957284f42282cf44673cf6e1
        </p>
        {resultString.length > maxCharacterCount - 1 ? (
          <div className="d-flex justify-content-end">
            <button
              className="d-flex bg-transparent mb-0 h6 font-weight-bold border-0 text-dark "
<<<<<<< HEAD
              style={{ outline: 'none' }}
              onClick={() => setReadmore(!readMore)}
=======
              style={{outline:'none'}}  onClick={() => setReadmore(!readMore)}
>>>>>>> ed25a59a59a6f6b9957284f42282cf44673cf6e1
            >
              {readMore ? 'read less' : 'read more'}
            </button>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div ref={forwardedRef} className="review-container">
      {docs.map((doc) => (
        <div data-aos="zoom-in-up" className="d-flex" key={doc.id}>
          <div className="reviews">
            <div className="d-flex flex-column p-3">
              <i className="fas fa-quote-left justify-content-start d-flex"></i>
              <ReadMore>{doc.message}</ReadMore>
              <div className="d-flex flex-column reviewer">
                <p className="h5 text-start m-0">{doc.name}</p>
                <span className="text-start">
                  <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                  <span className="text-secondary">{doc.address}</span>
                </span>
              </div>
            </div>
            <i className="fas fa-quote-right"></i>
            <div className="reviewer-img-container">
              <img src={doc.url} className="reviewer-img" alt="reviewer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Reviews;
