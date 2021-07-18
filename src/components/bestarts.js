import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import useFirestore from './hooks/useFirestore';
import Loader from './loader/loader';

function BestArts({ forwardedRef }) {
  const { docs } = useFirestore('toparts');
  //console.log(docs[0].url);
  const [show, setShow] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div ref={forwardedRef} className="position-relative">
      {docs.length === 0 && <Loader />}
      <div data-aos="fade-up" className="d-flex">
        <div className="d-inline-flex flex-column mb-3">
          <span className="display-1 bg-transparent text-dark p-2 rounded-lg justify-content-start d-flex">
            Top arts
          </span>
          <hr className="hr-small m-auto" />
          <hr className="small-line bg-dark m-auto" />
        </div>
      </div>

      <div className="d-flex flex-md-row flex-column position-relative">
        <div
          data-aos="zoom-in"
          className=" small-gallery col-md-3 col-12 flex-md-column flex-row"
        >
          {docs.map((doc, index) => (
            <img
              key={index}
              src={doc.url}
              className={
                'image-slide shadow' +
                (show === doc.url ? ' border-active shadow-lg' : '')
              }
              alt={'best arts'}
              onClick={() => setShow(doc.url)}
            />
          ))}
        </div>
        {docs[0] ? (
          <div data-aos="zoom-out" className="showPhoto col-md-9 col-12">
            <img
              src={show ? show : docs[0].url}
              alt="show"
              className="shadow"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default BestArts;
