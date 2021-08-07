//import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import useFirestore from './hooks/useFirestore';
import { db } from './firebase/firebaseConfig';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, FacebookShareButton } from 'react-share';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReferenceForm from './referenceForm';
import Loader from './loader/loader';
import SharedImage from './sharedimage';

function Gallery(props) {
  const { docs } = useFirestore('images');
  const [show, setShow] = useState({ show: false, index: 0 });
  const [slider, setSlider] = useState(false);
  const [share, setShare] = useState(false);
  const [refer, setRefer] = useState(false);
  const [imagedata, setImagedata] = useState({ show: false, data: null });
  const [scrollPosition, setScrollposition] = useState(null);

  useEffect(() => {
    if (slider) {
      if (show.index < docs.length - 1) {
        setTimeout(() => setShow({ ...show, index: show.index + 1 }), 3000);
      } else {
        setSlider(false);
      }
    }
  });

  useEffect(() => {
    const handleScrolling = () => {
      setScrollposition(window.scrollY);
    };
    handleScrolling();
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, [setScrollposition]);

  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      db.collection('images')
        .doc(id)
        .get()
        .then((snapshot) => {
          setImagedata({ show: true, data: snapshot.data() });
        });
    }
  }, [props]);

  const handleClick = (index) => {
    setShow({ show: true, index: index });
  };

  const next = () => {
    setSlider(false);
    const end = docs.length - 1;
    if (show.index > end - 1) {
      setShow({ ...show, index: 0 });
    } else {
      setShow({ ...show, index: show.index + 1 });
    }
  };

  const prev = () => {
    setSlider(false);
    const end = docs.length - 1;
    if (show.index === 0) {
      setShow({ ...show, index: end });
    } else {
      setShow({ ...show, index: show.index - 1 });
    }
  };

  const ImageWindow = () => {
    const likeRef = useRef();
    const handleLike = (e, id, count) => {
      e.preventDefault();
      db.collection('images')
        .doc(id)
        .update({ count: count + 1 });
      if (likeRef.current) {
        likeRef.current.setAttribute('disabled', 'disabled');
      }
    };
    const imageUrl =
      'https://nishajha.netlify.app/gallery/' + docs[show.index].id;
    return (
      <div className="view-image-container">
        <div className="view-image-outer">
          <img
            src={docs[show.index].url}
            className="gallery-img shadow-lg"
            alt={'expanded_image' + show.index}
          />

          <div className="user-buttons d-inline-flex shadow-lg">
            <button
              ref={likeRef}
              onClick={(e) => {
                handleLike(e, docs[show.index].id, docs[show.index].count);
              }}
            >
              <i className={'fas fa-heart '}></i>
              <span className="likes-count">{docs[show.index].count}</span>
            </button>

            <div className="position-relative">
              <button onClick={() => setShare(!share)}>
                <i className="fas fa-share-alt"></i>
              </button>
              {share && (
                <motion.div
                  className=" share-options"
                  initial={{ y: '100vh' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CopyToClipboard text={imageUrl}>
                    <button>
                      <i className="far fa-copy"></i>
                    </button>
                  </CopyToClipboard>
                  <WhatsappShareButton
                    url={imageUrl}
                    title={'Hey, take a look at this artwork!'}
                  >
                    <i className="fab fa-whatsapp"></i>
                  </WhatsappShareButton>
                  <FacebookShareButton
                    url={imageUrl}
                    quote={'Hey, take a look at this artwork!'}
                    hashtag="calligraphywrittings"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </FacebookShareButton>
                </motion.div>
              )}
            </div>
            <div className="position-relative">
              <button onClick={() => setRefer(!refer)}>
                <i className="fas fa-envelope-open-text"></i>
                <span className="refer-txt">refer</span>
              </button>
              {refer && (
                <div className="referForm">
                  <ReferenceForm
                    reference={docs[show.index].url}
                    setRefer={setRefer}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSlider(!slider);
                setRefer(false);
                setShare(false);
              }}
            >
              {slider ? (
                <i className="far fa-stop-circle"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
            </button>
          </div>
        </div>
        {!slider && <div><div className="prev-btn">
          <button onClick={prev} hidden={refer}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
        <div className="next-btn">
          <button onClick={next} hidden={refer}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div></div>}
        <div className="close-img">
          <button
            onClick={() => {
              setShow({ ...show, show: false });
              setSlider(false);
              setRefer(false);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="gallery-container px-3 pb-3">
      {docs.length === 0 && <Loader />}
      <div className="neonText-holder">
        <span className="neonText">GALLERY</span>
      </div>
      <div className="images-container">
        <motion.div className="gallery" layout>
          {docs.map((image, index) => (
            <LazyLoadImage
              effect="blur"
              scrollPosition={scrollPosition}
              src={image.url}
              key={index}
              alt="Gallery image_1"
              className="gallery__img shadow-sm"
              onClick={() => handleClick(index)}
            />
          ))}
        </motion.div>
      </div>
      {show.show ? <ImageWindow show={show} /> : null}
      {imagedata.show && (
        <SharedImage doc={imagedata.data} setImagedata={setImagedata} />
      )}
    </div>
  );
}
export default Gallery;
