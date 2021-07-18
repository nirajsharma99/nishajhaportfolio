import ss from '../ss1.png';
import VanillaTilt from 'vanilla-tilt';

function FollowOnInstagram() {
  VanillaTilt.init(document.querySelector('.insta-btn'), {
    max: 30,
    speed: 400,
    glare: true,
    'max-glare': 1,
  });
  return (
    <div data-aos="fade-up" className="insta-outer">
      <div className="insta-content">
        <div className="insta-desc">
          <span className="follow-cursive">follow me on</span>

          <div className="mt-4">
            <a
              href="https://instagram.com/calligraphywrittings?utm_medium=copy_link"
              className="insta-btn "
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://instagram.com/calligraphywrittings?utm_medium=copy_link"
              className="insta-username"
            >
              @calligraphywrittings
            </a>
          </div>
        </div>
        <div className="ss-container">
          <img src={ss} className="ss" alt="instagram-account" />
        </div>
      </div>
    </div>
  );
}
export default FollowOnInstagram;
