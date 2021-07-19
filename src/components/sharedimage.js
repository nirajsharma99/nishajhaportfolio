import { useState } from 'react';
import { db } from './firebase/firebaseConfig';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, FacebookShareButton } from 'react-share';
import ReferenceForm from './referenceForm';

const SharedImage = ({ doc, setImagedata }) => {
  const [share, setShare] = useState(false);
  const [refer, setRefer] = useState(false);
  const LikeButton = () => {
    const [like, setLike] = useState(false);

    const handleLike = (e, id, count) => {
      e.preventDefault();
      setLike(true);
      if (!like) {
        db.collection('images')
          .doc(id)
          .update({ count: count + 1 });
      }
    };
    return (
      <button
        onClick={(e) => {
          handleLike(e, doc.id, doc.count);
        }}
      >
        <i className={'fas fa-heart ' + (like ? 'liked' : '')}></i>
        <span className="likes-count">{doc.count}</span>
      </button>
    );
  };
  const imageUrl = 'https://nishajha.netlify.app/gallery/' + doc.id;
  return (
    <div className="view-image-container">
      <div className="view-image-outer">
        <img
          //data-aos={slider ? 'slide-left' : 'flip-right'}
          src={doc.url}
          className="gallery-img shadow-lg"
          alt={'expanded_image' + doc.filename}
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
                <ReferenceForm reference={doc.url} setRefer={setRefer} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="close-img">
        <button
          onClick={() => {
            setImagedata({ show: false, data: null });
          }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
export default SharedImage;
