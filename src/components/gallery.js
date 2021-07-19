//import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useFirestore from './hooks/useFirestore';
import { db } from './firebase/firebaseConfig';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, FacebookShareButton } from 'react-share';
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

  useEffect(() => {
    if (slider) {
      if (show.index < docs.length - 1) {
        setTimeout(() => setShow({ ...show, index: show.index + 1 }), 3000);
      } else {
        setSlider(false);
      }
    }
  }, [show, slider]);

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

  const LikeButton = () => {
    const [like, setLike] = useState(false);
    console.log(like);

    const handleLike = (e, id, count) => {
      e.preventDefault();
      setLike(true);
      setSlider(false);
      if (!like) {
        db.collection('images')
          .doc(id)
          .update({ count: count + 1 });
      }
    };
    return (
      <button
        onClick={(e) => {
          handleLike(e, docs[show.index].id, docs[show.index].count);
        }}
      >
        <i className={'fas fa-heart ' + (like ? 'liked' : '')}></i>
        <span className="likes-count">{docs[show.index].count}</span>
      </button>
    );
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
    const imageUrl = 'https://nishajha.netlify.app/' + docs[show.index].id;
    return (
      <div className="view-image-container">
        <div className="view-image-outer">
          <img
            //data-aos={slider ? 'slide-left' : 'flip-right'}
            src={docs[show.index].url}
            className="gallery-img shadow-lg"
            alt={'expanded_image' + show.index}
          />

          <div className="user-buttons d-inline-flex shadow-lg">
            <LikeButton />

            <div className="position-relative">
              <button onClick={() => setShare(!share)}>
                <i className="fas fa-share-alt"></i>
              </button>
              {share && (
                <div data-aos="slide-up" className=" share-options">
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
                </div>
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
        <div className="prev-btn">
          <button onClick={prev}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
        <div className="next-btn">
          <button onClick={next}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="close-img">
          <button
            onClick={() => {
              setShow({ ...show, show: false });
              setSlider(false);
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
        <span className="neonText">Gallery</span>
      </div>
      <div className="images-container">
        <motion.div className="gallery" layout>
          {docs.map((image, index) => (
            <motion.img
              src={image.url}
              key={index}
              alt="Gallery image_1"
              className="gallery__img"
              onClick={() => handleClick(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
